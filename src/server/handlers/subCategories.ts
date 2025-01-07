import { db } from "@ssms/lib/drizzle";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { categories, subCategories } from "../db/schemas/tickets";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { SubCategoriesSchema } from "../validations/ticketsSchemas";

export const subCategoriesHandler = new Hono()
  .get("/", async (c) => {
    try {
      const stmt = db
        .select({
          id: subCategories.id,
          category: categories.name,
          subCategory: subCategories.name,
          description: subCategories.description,
          createdAt: subCategories.createdAt,
          updatedAt: subCategories.updatedAt,
        })
        .from(subCategories)
        .innerJoin(categories, eq(subCategories.categoryId, categories.id))
        .prepare("get_all_sub_categories");

      const res = await stmt.execute();
      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/:id", async (c) => {
    try {
      const subCategoryId = c.req.param("id");

      const stmt = db
        .select()
        .from(subCategories)
        .where(eq(subCategories.id, subCategoryId))
        .prepare("get_sub_category_by_id");

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
  .post("/", zValidator("form", SubCategoriesSchema), async (c) => {
    try {
      const body = c.req.valid("form");

      const stmt = db
        .insert(subCategories)
        .values(body)
        .returning({
          id: subCategories.id,
          categoryId: subCategories.categoryId,
          name: subCategories.name,
          description: subCategories.description,
          createdAt: subCategories.createdAt,
          updatedAt: subCategories.updatedAt,
        })
        .prepare("create_sub_category");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id", zValidator("form", SubCategoriesSchema.partial()), async (c) => {
    try {
      const subCategoryId = c.req.param("id");
      const body = c.req.valid("form");

      const stmt = db
        .update(subCategories)
        .set(body)
        .where(eq(subCategories.id, subCategoryId))
        .returning({
          id: subCategories.id,
          categoryId: subCategories.categoryId,
          name: subCategories.name,
          description: subCategories.description,
          createdAt: subCategories.createdAt,
          updatedAt: subCategories.updatedAt,
        })
        .prepare("update_sub_category");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .delete("/:id", async (c) => {
    try {
      const subCategoryId = c.req.param("id");

      const stmt = db
        .delete(subCategories)
        .where(eq(subCategories.id, subCategoryId))
        .prepare("delete_sub_category");

      const res = await stmt.execute();

      return res.rowCount === 0
        ? c.json({ status: "No rows affected!" })
        : c.json({ status: "Successfully deleted!" });
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  });
