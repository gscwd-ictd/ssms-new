import { db } from "@ssms/lib/drizzle";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { supportTypes } from "../db/schemas/tickets";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { SupportTypesSchema } from "../validations/ticketsSchemas";

export const supportTypesHandler = new Hono()
  .get("/", async (c) => {
    try {
      const stmt = db.select().from(supportTypes).prepare("get_all_support_types");
      const res = await stmt.execute();
      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/:id", async (c) => {
    try {
      const supportTypeId = c.req.param("id");

      const stmt = db
        .select()
        .from(supportTypes)
        .where(eq(supportTypes.id, supportTypeId))
        .prepare("get_support_type_by_id");

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
  .post("/", zValidator("form", SupportTypesSchema), async (c) => {
    try {
      const body = c.req.valid("form");

      const stmt = db
        .insert(supportTypes)
        .values(body)
        .returning({
          id: supportTypes.id,
          name: supportTypes.name,
          description: supportTypes.description,
          createdAt: supportTypes.createdAt,
          updatedAt: supportTypes.updatedAt,
        })
        .prepare("create_support_type");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id", zValidator("form", SupportTypesSchema.partial()), async (c) => {
    try {
      const supportTypeId = c.req.param("id");
      const body = c.req.valid("form");

      const stmt = db
        .update(supportTypes)
        .set(body)
        .where(eq(supportTypes.id, supportTypeId))
        .returning({
          id: supportTypes.id,
          name: supportTypes.name,
          description: supportTypes.description,
          createdAt: supportTypes.createdAt,
          updatedAt: supportTypes.updatedAt,
        })
        .prepare("update_support_type");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .delete("/:id", async (c) => {
    try {
      const supportTypeId = c.req.param("id");

      const stmt = db
        .delete(supportTypes)
        .where(eq(supportTypes.id, supportTypeId))
        .prepare("delete_support_type");

      const res = await stmt.execute();

      return res.rowCount === 0
        ? c.json({ status: "No rows affected!" })
        : c.json({ status: "Successfully deleted!" });
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  });
