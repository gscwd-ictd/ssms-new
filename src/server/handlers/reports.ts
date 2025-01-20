import { db } from "@ssms/lib/drizzle";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { categories, subCategories, supportTypes, tickets } from "../db/schemas/tickets";
import { aliasedTable, eq, between } from "drizzle-orm";
import { user } from "../db/schemas/auth";

export const reportsHandler = new Hono().get("/", async (c) => {
  const from = c.req.query("from");
  const to = c.req.query("to");

  const fromDate = new Date(from as string);
  const toDate = new Date(to as string);

  const assignee = aliasedTable(user, "asignee");
  const ca = aliasedTable(categories, "ca");
  const sc = aliasedTable(subCategories, "sc");
  const su = aliasedTable(supportTypes, "su");

  try {
    const stmt = db
      .select({
        id: tickets.id,
        requestorId: user.id,
        details: tickets.details,
        requestorName: user.name,
        category: ca.name,
        subCategory: sc.name,
        supportType: su.name,
        requestedAt: tickets.createdAt,
        resolvedAt: tickets.resolvedAt,
        assignedTo: assignee.name,
        status: tickets.status,
      })
      .from(tickets)
      .innerJoin(user, eq(user.id, tickets.requestorId))
      .leftJoin(assignee, eq(assignee.id, tickets.assignedId))
      .leftJoin(ca, eq(ca.id, tickets.categoryId))
      .leftJoin(sc, eq(sc.id, tickets.subCategoryId))
      .leftJoin(su, eq(su.id, tickets.supportTypeId))
      .where(between(tickets.createdAt, fromDate, toDate))
      .orderBy(tickets.createdAt)
      .prepare("get_report_monthly_summary");

    const res = await stmt.execute();

    return c.json(res);
  } catch (error) {
    console.error(error);
    throw new HTTPException(400, { message: "Something went wrong!", cause: error });
  }
});
