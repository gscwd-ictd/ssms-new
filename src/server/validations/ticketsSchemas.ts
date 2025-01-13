import { z } from "zod";

export const CategoriesSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const SubCategoriesSchema = z.object({
  categoryId: z.string().min(28),
  name: z.string(),
  description: z.string().optional(),
});

export const SupportTypesSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export const TicketsSchema = z.object({
  requestorId: z.string().min(28),
  assignedId: z.string().optional(),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  supportTypeId: z.string().optional(),
  details: z.string().min(1, { message: "Please provide some details" }),
  status: z.enum(["open", "closed", "ongoing", "cancelled", "resolved"]).optional(),
  assessment: z.string().optional(),
  action: z.string().optional(),
  cancelledDueTo: z.string().optional(),
  startedAt: z.date().optional(),
  resolvedAt: z.date().optional(),
  cancelledAt: z.date().optional(),
});

export const AcceptTicketSchema = z.object({
  assignedId: z.string().optional(),
  status: z.enum(["open", "closed", "ongoing", "cancelled", "resolved"]).optional(),
});

export const AssignTicketSchema = z.object({
  assignedId: z.string().optional(),
});

export const ResolveTicketsSchema = z.object({
  assignedId: z.string().optional(),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  supportTypeId: z.string().optional(),
  status: z.enum(["open", "closed", "ongoing", "cancelled", "resolved"]).optional(),
  details: z.string().optional(),
  assessment: z.string().optional(),
  action: z.string().optional(),
  resolvedAt: z.string().optional(),
});

export const AddSupportTicketsFormSchema = z.object({
  requestorId: z.string().min(28),
  categoryId: z.string().min(28),
  subCategoryId: z.string().min(28),
  supportTypeId: z.string().min(28),
  details: z.string().min(1, { message: "Please provide some details" }),
});

export const CancelTicketFormSchema = z.object({
  cancelledDueTo: z.string(),
});

export const CommentsSchema = z.object({
  userId: z.string().optional(),
  ticketId: z.string().min(28),
  details: z.string(),
});
