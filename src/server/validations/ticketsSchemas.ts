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
  assignedId: z.string().optional(), // managed by better-auth
  categoryId: z.string().min(28).optional(),
  subCategoryId: z.string().min(28).optional(),
  supportTypeId: z.string().min(28).optional(),
  details: z.string(),
});

export const CommentsSchema = z.object({
  userId: z.string(),
  ticketId: z.string().min(28),
  details: z.string(),
});
