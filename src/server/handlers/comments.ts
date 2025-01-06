import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@ssms/lib/drizzle";
import { comments } from "../db/schemas/tickets";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { CommentsSchema } from "../validations/ticketsSchemas";

export const commentsHandler = new Hono()
  .get("/", async (c) => {
    try {
      const stmt = db.select().from(comments).prepare("get_all_comments");
      const res = await stmt.execute();
      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/:id", async (c) => {
    try {
      const commentId = c.req.param("id");

      const stmt = db.select().from(comments).where(eq(comments.id, commentId)).prepare("get_comment_by_id");

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
  .post("/", zValidator("form", CommentsSchema), async (c) => {
    try {
      const body = c.req.valid("form");

      const stmt = db
        .insert(comments)
        .values(body)
        .returning({
          userId: comments.userId,
          ticketId: comments.ticketId,
          details: comments.details,
        })
        .prepare("create_comment");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id", zValidator("form", CommentsSchema.partial()), async (c) => {
    try {
      const commentId = c.req.param("id");
      const body = c.req.valid("form");

      const stmt = db
        .update(comments)
        .set(body)
        .where(eq(comments.id, commentId))
        .returning({
          userId: comments.userId,
          ticketId: comments.ticketId,
          details: comments.details,
        })
        .prepare("update_comment");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .delete("/:id", async (c) => {
    try {
      const commentId = c.req.param("id");

      const stmt = db.delete(comments).where(eq(comments.id, commentId)).prepare("delete_comment");
      const res = await stmt.execute();

      return res.rowCount === 0
        ? c.json({ status: "No rows affected!" })
        : c.json({ status: "Successfully deleted!" });
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  });
