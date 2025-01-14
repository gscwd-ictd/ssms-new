import { db } from "@ssms/lib/drizzle";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { user } from "../db/schemas/auth";
import { eq } from "drizzle-orm";

export const usersHandler = new Hono()
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
  });
