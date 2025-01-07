import { db } from "@ssms/lib/drizzle";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { tickets } from "../db/schemas/tickets";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import { TicketsSchema } from "../validations/ticketsSchemas";

export const ticketsHandler = new Hono()
  .get("/", async (c) => {
    try {
      const stmt = db.select().from(tickets).prepare("get_all_tickets");
      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/:id", async (c) => {
    try {
      const ticketId = c.req.param("id");

      const stmt = db.select().from(tickets).where(eq(tickets.id, ticketId)).prepare("get_ticket_by_id");

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
  .post("/", zValidator("form", TicketsSchema), async (c) => {
    try {
      const body = c.req.valid("form");

      const stmt = db
        .insert(tickets)
        .values(body)
        .returning({
          requestorId: tickets.requestorId,
          categoryId: tickets.categoryId,
          subCategoryId: tickets.subCategoryId,
          supportTypeId: tickets.supportTypeId,
          details: tickets.details,
          status: tickets.status,
          createdAt: tickets.createdAt,
          updatedAt: tickets.updatedAt,
        })
        .prepare("create_ticket");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id", zValidator("form", TicketsSchema.partial()), async (c) => {
    try {
      const ticketId = c.req.param("id");
      const body = c.req.valid("form");

      const stmt = db
        .update(tickets)
        .set(body)
        .where(eq(tickets.id, ticketId))
        .returning({
          requestorId: tickets.requestorId,
          categoryId: tickets.categoryId,
          subCategoryId: tickets.subCategoryId,
          supportTypeId: tickets.supportTypeId,
          details: tickets.details,
          status: tickets.status,
          createdAt: tickets.createdAt,
          updatedAt: tickets.updatedAt,
        })
        .prepare("update_ticket");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  })
  .delete("/:id", async (c) => {
    try {
      const ticketId = c.req.param("id");

      const stmt = db.delete(tickets).where(eq(tickets.id, ticketId)).prepare("delete_ticket");
      const res = await stmt.execute();

      return res.rowCount === 0
        ? c.json({ status: "No rows affected!" })
        : c.json({ status: "Successfully deleted!" });
    } catch (error) {
      console.error(error);
      throw new HTTPException(401, { message: "Something went wrong!", cause: error });
    }
  });
