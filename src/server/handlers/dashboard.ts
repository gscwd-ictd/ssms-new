import { db } from "@ssms/lib/drizzle";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { categories, subCategories, supportTypes, tickets } from "../db/schemas/tickets";
import { user } from "../db/schemas/auth";
import { aliasedTable, and, between, count, eq, sql } from "drizzle-orm";
import { QueryResult } from "pg";
import { InputData } from "../utils/transformMonthlyLoadData";
import { department, division, office } from "../db/schemas/org";

export const dashboardHandler = new Hono()
  .get("/status", async (c) => {
    const status = c.req.query("status") as "open" | "ongoing" | "cancelled" | "closed" | "resolved";
    const from = c.req.query("from");
    const to = c.req.query("to");

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    try {
      const stmt = db
        .select({ count: count(tickets.id) })
        .from(tickets)
        .where(and(eq(tickets.status, status), between(tickets.createdAt, fromDate, toDate)))
        .prepare("get_count_tickets_by_status");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/tickets-by-assignment/:id", async (c) => {
    const assignedId = c.req.param("id");

    const status = c.req.query("status") as "open" | "ongoing" | "cancelled" | "resolved";
    const from = c.req.query("from");
    const to = c.req.query("to");

    const ca = aliasedTable(categories, "ca");
    const sc = aliasedTable(subCategories, "sc");
    const su = aliasedTable(supportTypes, "su");

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    try {
      const stmt = db
        .select({
          id: tickets.id,
          requestedByName: user.name,
          requestedByEmail: user.email,
          requestedByAvatar: user.image,
          details: tickets.details,
          category: ca.name,
          subCategory: sc.name,
          supportType: su.name,
          status: tickets.status,
          requestedAt: tickets.createdAt,
        })
        .from(tickets)
        .innerJoin(user, eq(user.id, tickets.requestorId))
        .leftJoin(ca, eq(ca.id, tickets.categoryId))
        .leftJoin(sc, eq(sc.id, tickets.subCategoryId))
        .leftJoin(su, eq(su.id, tickets.supportTypeId))
        .where(
          and(
            eq(tickets.status, status),
            and(eq(tickets.assignedId, assignedId), between(tickets.createdAt, fromDate, toDate))
          )
        )
        .orderBy(tickets.createdAt)
        .prepare("get_tickets_by_assignment");

      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/monthly-ticket-load", async (c) => {
    const from = c.req.query("from");
    const to = c.req.query("to");

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    try {
      const res: QueryResult<InputData> = await db.execute(sql`SELECT
                          TO_CHAR(DATE_TRUNC('month', t.created_at), 'Mon') as month,
                          c.name as category_name,
                          COUNT(*) as ticket_count
                        FROM tickets t
                        JOIN sub_categories sc ON t.sub_category_id = sc.id
                        JOIN categories c ON sc.category_id = c.id
                        WHERE t.created_at BETWEEN ${fromDate} AND ${toDate} 
                        GROUP BY
                          DATE_TRUNC('month', t.created_at),
                          c.name
                        ORDER BY
                          DATE_TRUNC('month', t.created_at),
                          c.name;`);

      return c.json(res.rows);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/weekly-ticket-volume", async (c) => {
    try {
      const res = await db.execute(sql`WITH RECURSIVE days AS (
                                        SELECT 
                                          date_trunc('week', CURRENT_DATE) + (n || ' days')::interval as day_date
                                        FROM generate_series(0, 6) n
                                      )
                                      SELECT 
                                        TO_CHAR(days.day_date, 'Dy') as date,
                                        COALESCE(COUNT(tickets.id), 0) as total,
                                        COALESCE(COUNT(CASE WHEN tickets.status = 'resolved' THEN 1 END), 0) as resolved
                                      FROM days
                                      LEFT JOIN tickets ON 
                                        DATE_TRUNC('day', tickets.created_at) = DATE_TRUNC('day', days.day_date)
                                      GROUP BY 
                                        days.day_date
                                      ORDER BY 
                                        days.day_date;`);

      return c.json(res.rows);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/ticket-categories", async (c) => {
    try {
      const res = await db
        .select({
          categoryName: categories.name,
          count: count(tickets.id),
        })
        .from(tickets)
        .leftJoin(categories, eq(tickets.categoryId, categories.id))
        .groupBy(categories.name);

      // Format for chart display with colors
      const chartData = res.map((item, index) => {
        // You could store colors in your DB or use a predefined color map
        const colors = ["#0ea5e9", "#f59e0b", "#10b981", "#6366f1", "#ec4899"];

        return {
          name: item.categoryName,
          value: Number(item.count),
          color: colors[index % colors.length],
        };
      });

      return c.json(chartData);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/tickets-by-org", async (c) => {
    const query = c.req.query();

    try {
      if (query.org === "department") {
        // We need to join through users to get to departments
        const results = await db
          .select({
            name: department.name,
            count: count(tickets.id),
          })
          .from(tickets)
          .leftJoin(user, eq(tickets.requestorId, user.id))
          .leftJoin(department, eq(user.department, department.id))
          .groupBy(department.name)
          .orderBy(sql`count(*) DESC`);

        // Map colors and format for chart
        const colors = ["#0ea5e9", "#f59e0b", "#10b981", "#6366f1", "#ec4899"];

        const departments = results.map((item, index) => ({
          name: item.name || "Unassigned",
          count: Number(item.count),
          color: colors[index % colors.length],
        }));

        return c.json(departments);
      }

      if (query.org === "office") {
        const results = await db
          .select({
            name: office.name,
            count: count(tickets.id),
          })
          .from(tickets)
          .leftJoin(user, eq(tickets.requestorId, user.id))
          .leftJoin(office, eq(user.office, office.id))
          .groupBy(office.name)
          .orderBy(sql`count(*) DESC`);

        const colors = ["#0ea5e9", "#f59e0b", "#10b981", "#6366f1"];

        const offices = results.map((item, index) => ({
          name: item.name || "Unassigned",
          count: Number(item.count),
          color: colors[index % colors.length],
        }));

        return c.json(offices);
      }

      if (query.org === "division") {
        const results = await db
          .select({
            name: division.name,
            count: count(tickets.id),
          })
          .from(tickets)
          .leftJoin(user, eq(tickets.requestorId, user.id))
          .leftJoin(division, eq(user.division, division.id))
          .groupBy(division.name)
          .orderBy(sql`count(*) DESC`);

        const colors = ["#0ea5e9", "#f59e0b", "#10b981", "#6366f1"];

        const divisions = results.map((item, index) => ({
          name: item.name || "Unassigned",
          count: Number(item.count),
          color: colors[index % colors.length],
        }));

        return c.json(divisions);
      }
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  });
