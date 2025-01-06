import { db } from "@ssms/lib/drizzle";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { department } from "../db/schemas/org";
import { zValidator } from "@hono/zod-validator";
import { DepartmentSchema } from "../validations/orgSchemas";
import { HTTPException } from "hono/http-exception";

export const departmentHandler = new Hono()
  .get("/", async (c) => {
    try {
      const stmt = db.select().from(department).prepare("get_all_departments");
      const res = await stmt.execute();
      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/:id", async (c) => {
    try {
      const departmentId = c.req.param("id");

      const stmt = db
        .select()
        .from(department)
        .where(eq(department.id, departmentId))
        .prepare("get_department_by_id");

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
  .post("/", zValidator("form", DepartmentSchema), async (c) => {
    try {
      const body = c.req.valid("form");
      const stmt = db
        .insert(department)
        .values(body)
        .returning({
          id: department.id,
          officeId: department.officeId,
          name: department.name,
          createdAt: department.createdAt,
          updatedAt: department.updatedAt,
        })
        .prepare("create_department");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id", zValidator("form", DepartmentSchema.partial()), async (c) => {
    try {
      const departmentId = c.req.param("id");
      const body = c.req.valid("form");

      const stmt = db
        .update(department)
        .set(body)
        .where(eq(department.id, departmentId))
        .returning({
          id: department.id,
          officeId: department.officeId,
          name: department.name,
          createdAt: department.createdAt,
          updatedAt: department.updatedAt,
        })
        .prepare("update_department");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .delete("/:id", async (c) => {
    try {
      const departmentId = c.req.param("id");

      const stmt = db.delete(department).where(eq(department.id, departmentId)).prepare("delete_department");
      const res = await stmt.execute();

      return res.rowCount === 0
        ? c.json({ status: "No rows affected!" })
        : c.json({ status: "Successfully deleted!" });
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  });
