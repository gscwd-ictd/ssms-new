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
  requestorId: z.string(), // managed by better-auth
  assignedId: z.string(), // managed by better-auth
  categoryId: z.string().min(28),
  subCategoryId: z.string().min(28),
  supportTypeId: z.string().min(28),
  details: z.string(),
  status: z.enum(["open", "closed", "ongoing", "cancelled", "resolved"]),
});

export const CommentsSchema = z.object({
  userId: z.string(),
  ticketId: z.string().min(28),
  details: z.string(),
});
