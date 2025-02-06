import { db } from "@ssms/lib/drizzle";
import { aliasedTable, between, eq } from "drizzle-orm";
import { Hono } from "hono";
import { categories, subCategories, supportTypes, tickets } from "../db/schemas/tickets";
import { HTTPException } from "hono/http-exception";
import { zValidator } from "@hono/zod-validator";
import {
  AcceptTicketSchema,
  AssignTicketSchema,
  CancelTicketFormSchema,
  ResolveTicketsSchema,
  TicketsSchema,
} from "../validations/ticketsSchemas";
import { user } from "../db/schemas/auth";
import { takeUniqueOrThrow } from "../utils/takeUniqueOrThrow";

export const ticketsHandler = new Hono()
  .get("/", async (c) => {
    try {
      const assignee = aliasedTable(user, "asignee");

      const stmt = db
        .select({
          id: tickets.id,
          requestedBy: user.name,
          requestedByAvatar: user.image,
          assignedTo: assignee.name,
          assignedToAvatar: assignee.image,
          details: tickets.details,
          status: tickets.status,
          createdAt: tickets.createdAt,
          updatedAt: tickets.updatedAt,
        })
        .from(tickets)
        .innerJoin(user, eq(user.id, tickets.requestorId))
        .leftJoin(assignee, eq(assignee.id, tickets.assignedId))
        .prepare("get_all_tickets");

      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/range", async (c) => {
    const assignee = aliasedTable(user, "asignee");

    const from = c.req.query("from");
    const to = c.req.query("to");

    const fromDate = new Date(from as string);
    const toDate = new Date(to as string);

    try {
      const stmt = db
        .select({
          id: tickets.id,
          requestedBy: user.name,
          requestedByAvatar: user.image,
          assignedTo: assignee.name,
          assignedToAvatar: assignee.image,
          ticketNo: tickets.ticketNo,
          details: tickets.details,
          status: tickets.status,
          createdAt: tickets.createdAt,
          updatedAt: tickets.updatedAt,
        })
        .from(tickets)
        .innerJoin(user, eq(user.id, tickets.requestorId))
        .leftJoin(assignee, eq(assignee.id, tickets.assignedId))
        .where(between(tickets.createdAt, fromDate, toDate))
        .prepare("get_all_tickets_filter_by_date_range");

      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/:id", async (c) => {
    const ticketId = c.req.param("id");

    const assignee = aliasedTable(user, "asignee");
    const ca = aliasedTable(categories, "ca");
    const sc = aliasedTable(subCategories, "sc");
    const su = aliasedTable(supportTypes, "su");

    const stmt = db
      .select({
        id: tickets.id,
        requestedBy: user.name,
        requestedByAvatar: user.image,
        requestedByEmail: user.email,
        assignedToId: assignee.id,
        assignedToName: assignee.name,
        assignedToAvatar: assignee.image,
        assignedToEmail: assignee.email,
        details: tickets.details,
        categoryId: ca.id,
        categoryName: ca.name,
        subCategoryId: sc.id,
        subCategoryName: sc.name,
        supportTypeId: su.id,
        supportTypeName: su.name,
        status: tickets.status,
        createdAt: tickets.createdAt,
        updatedAt: tickets.updatedAt,
        startedAt: tickets.startedAt,
        cancelledAt: tickets.cancelledAt,
        resolvedAt: tickets.resolvedAt,
        cancelledDueTo: tickets.cancelledDueTo,
        action: tickets.action,
        assessment: tickets.assessment,
      })
      .from(tickets)
      .innerJoin(user, eq(user.id, tickets.requestorId))
      .leftJoin(assignee, eq(assignee.id, tickets.assignedId))
      .leftJoin(ca, eq(ca.id, tickets.categoryId))
      .leftJoin(sc, eq(sc.id, tickets.subCategoryId))
      .leftJoin(su, eq(su.id, tickets.supportTypeId))
      .where(eq(tickets.id, ticketId))
      .prepare("get_ticket_by_id");

    const res = await stmt.execute().then(takeUniqueOrThrow);

    return c.json(res);
  })
  .post("/", zValidator("form", TicketsSchema), async (c) => {
    try {
      const body = c.req.valid("form");

      const stmt = db
        .insert(tickets)
        .values(body)
        .returning({
          id: tickets.id,
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
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
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
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id/accept", zValidator("json", AcceptTicketSchema), async (c) => {
    try {
      const ticketId = c.req.param("id");
      const body = c.req.valid("json");

      const stmt = db
        .update(tickets)
        .set({ ...body, startedAt: new Date() })
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
        .prepare("accept_ticket");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id/assign", zValidator("form", AssignTicketSchema), async (c) => {
    const ticketId = c.req.param("id");
    const body = c.req.valid("form");

    try {
      const stmt = db
        .update(tickets)
        .set({ ...body, status: "ongoing", startedAt: new Date() })
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
        .prepare("assign_ticket");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id/resolve", zValidator("form", ResolveTicketsSchema), async (c) => {
    const ticketId = c.req.param("id");
    const body = c.req.valid("form");

    try {
      const stmt = db
        .update(tickets)
        .set({ ...body, resolvedAt: new Date() })
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
        .prepare("resolve_ticket");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .patch("/:id/cancel", zValidator("form", CancelTicketFormSchema), async (c) => {
    const ticketId = c.req.param("id");
    const body = c.req.valid("form");

    try {
      const stmt = db
        .update(tickets)
        .set({ ...body, status: "cancelled", cancelledAt: new Date() })
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
        .prepare("cancel_ticket");

      const res = await stmt.execute();

      return c.json(res[0]);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
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
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  })
  .get("/user/:id", async (c) => {
    const userId = c.req.param("id");

    try {
      const assignee = aliasedTable(user, "asignee");

      const stmt = db
        .select({
          id: tickets.id,
          requestedBy: user.name,
          requestedByAvatar: user.image,
          assignedTo: assignee.name,
          assignedToAvatar: assignee.image,
          details: tickets.details,
          status: tickets.status,
          createdAt: tickets.createdAt,
          updatedAt: tickets.updatedAt,
        })
        .from(tickets)
        .innerJoin(user, eq(user.id, tickets.requestorId))
        .leftJoin(assignee, eq(assignee.id, tickets.assignedId))
        .where(eq(tickets.requestorId, userId))
        .prepare("get_all_tickets_by_requestor_id");

      const res = await stmt.execute();

      return c.json(res);
    } catch (error) {
      console.error(error);
      throw new HTTPException(400, { message: "Something went wrong!", cause: error });
    }
  });
