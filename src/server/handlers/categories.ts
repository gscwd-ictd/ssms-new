import { db } from "@ssms/lib/drizzle";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { categories } from "../db/schemas/tickets";
import { zValidator } from "@hono/zod-validator";
import { CategoriesSchema } from "../validations/ticketsSchemas";

export const categoriesHandler = new Hono()
  .get("/", async (c) => {
    try {
      const stmt = db.select().from(categories).prepare("get_all_categories");
      const res = await stmt.execute();
      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/:id", async (c) => {
    try {
      const categoriesId = c.req.param("id");

      const stmt = db
        .select()
        .from(categories)
        .where(eq(categories.id, categoriesId))
        .prepare("get_category_by_id");

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
  .post("/", zValidator("form", CategoriesSchema), async (c) => {
    try {
      const body = c.req.valid("form");

      const stmt = db
        .insert(categories)
        .values(body)
        .returning({
          id: categories.id,
          name: categories.name,
          description: categories.description,
          createdAt: categories.createdAt,
          updatedAt: categories.updatedAt,
        })
        .prepare("create_category");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id", zValidator("form", CategoriesSchema.partial()), async (c) => {
    try {
      const categoryId = c.req.param("id");
      const body = c.req.valid("form");

      const stmt = db
        .update(categories)
        .set(body)
        .where(eq(categories.id, categoryId))
        .returning({
          id: categories.id,
          name: categories.name,
          description: categories.description,
          createdAt: categories.createdAt,
          updatedAt: categories.updatedAt,
        })
        .prepare("update_category");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .delete("/:id", async (c) => {
    try {
      const categoryId = c.req.param("id");

      const stmt = db.delete(categories).where(eq(categories.id, categoryId)).prepare("delete_category");
      const res = await stmt.execute();

      return res.rowCount === 0
        ? c.json({ status: "No rows affected!" })
        : c.json({ status: "Successfully deleted!" });
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  });
