import { db } from "@ssms/lib/drizzle";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { user } from "../db/schemas/auth";
import { aliasedTable, eq } from "drizzle-orm";
import { department, division, office } from "../db/schemas/org";
import { z } from "zod";
import { importUsersFromLocalCSV } from "../utils/csv/importUsers";

export const usersHandler = new Hono()
  .get("/", async (c) => {
    const dept = aliasedTable(department, "dept");
    const div = aliasedTable(division, "div");

    try {
      const stmt = db
        .select({
          id: user.id,
          name: user.name,
          image: user.image,
          role: user.role,
          officeId: office.id,
          office: office.name,
          departmentId: dept.id,
          department: dept.name,
          divisionId: div.id,
          division: div.name,
        })
        .from(user)
        .innerJoin(office, eq(office.id, user.office))
        .leftJoin(dept, eq(dept.id, user.department))
        .leftJoin(div, eq(div.id, user.division))
        .prepare("get_all_users");

      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("list-summary", async (c) => {
    try {
      const stmt = db
        .select({
          id: user.id,
          name: user.name,
          image: user.image,
        })
        .from(user)
        .prepare("user_list_summary");

      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/list-summary/q", async (c) => {
    const role = c.req.query("role") as "user" | "support";

    try {
      if (role) {
        const stmt = db
          .select({
            id: user.id,
            name: user.name,
            image: user.image,
          })
          .from(user)
          .where(eq(user.role, role))
          .prepare("user_by_role_list_summary");

        const res = await stmt.execute();

        return c.json(res);
      }
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .post("bulk-add", async (c) => {
    try {
      const result = await importUsersFromLocalCSV();

      return c.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return c.json({
          success: false,
          message: "Invalid request format",
          errors: error.errors.map((e) => ({
            row: 0,
            message: e.message,
          })),
        });
      }

      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  });
