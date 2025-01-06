import { db } from "@ssms/lib/drizzle";
import { Hono } from "hono";
import { office } from "../db/schemas/org";
import { eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { OfficeSchema } from "../validations/orgSchemas";
import { HTTPException } from "hono/http-exception";

export const officeHandler = new Hono()
  .get("/", async (c) => {
    try {
      const stmt = db.select().from(office).prepare("get_all_offices");
      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/:id", async (c) => {
    try {
      const officeId = c.req.param("id");
      const stmt = db.select().from(office).where(eq(office.id, officeId)).prepare("get_office_by_id");
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
  .post("/", zValidator("form", OfficeSchema), async (c) => {
    try {
      const body = c.req.valid("form");
      const stmt = db
        .insert(office)
        .values(body)
        .returning({
          id: office.id,
          name: office.name,
          createdAt: office.createdAt,
          updatedAt: office.updatedAt,
        })
        .prepare("create_office");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id", zValidator("form", OfficeSchema.partial()), async (c) => {
    try {
      const officeId = c.req.param("id");
      const body = c.req.valid("form");

      const stmt = db
        .update(office)
        .set(body)
        .where(eq(office.id, officeId))
        .returning({
          id: office.id,
          name: office.name,
          createdAt: office.createdAt,
          updatedAt: office.updatedAt,
        })
        .prepare("update_office");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .delete("/:id", async (c) => {
    try {
      const officeId = c.req.param("id");

      const stmt = db.delete(office).where(eq(office.id, officeId)).prepare("delete_office");
      const res = await stmt.execute();

      return res.rowCount === 0
        ? c.json({ status: "No rows affected!" })
        : c.json({ status: "Successfully deleted!" });
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  });
