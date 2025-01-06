import { db } from "@ssms/lib/drizzle";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { department, division } from "../db/schemas/org";
import { zValidator } from "@hono/zod-validator";
import { DivisionSchema } from "../validations/orgSchemas";
import { HTTPException } from "hono/http-exception";

export const divisionHandler = new Hono()
  .get("/", async (c) => {
    try {
      const stmt = db.select().from(division).prepare("get_all_divisions");
      const res = await stmt.execute();
      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/:id", async (c) => {
    try {
      const divisionId = c.req.param("id");

      const stmt = db
        .select()
        .from(division)
        .where(eq(division.id, divisionId))
        .prepare("get_division_by_id");

      const res = await stmt.execute();

      if (res.length === 0) {
        return c.json({ error: "Not found!" }, 404);
      }

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .post("/", zValidator("form", DivisionSchema), async (c) => {
    try {
      const body = c.req.valid("form");
      const stmt = db
        .insert(division)
        .values(body)
        .returning({
          id: division.id,
          departmentId: division.departmentId,
          name: division.name,
          createdAt: division.createdAt,
          updatedAt: division.updatedAt,
        })
        .prepare("create_division");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id", zValidator("form", DivisionSchema.partial()), async (c) => {
    try {
      const divisionId = c.req.param("id");
      const body = c.req.valid("form");

      const stmt = db
        .update(division)
        .set(body)
        .where(eq(division.id, divisionId))
        .returning({
          id: division.id,
          departmentId: division.departmentId,
          name: division.name,
          createdAt: division.createdAt,
          updatedAt: division.updatedAt,
        })
        .prepare("update_division");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .delete("/:id", async (c) => {
    try {
      const divisionId = c.req.param("id");

      const stmt = db.delete(division).where(eq(division.id, divisionId)).prepare("delete_division");
      const res = await stmt.execute();

      return res.rowCount === 0
        ? c.json({ status: "No rows affected!" })
        : c.json({ status: "Successfully deleted!" });
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  });
