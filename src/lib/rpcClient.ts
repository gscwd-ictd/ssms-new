import { categoriesHandler } from "@ssms/server/handlers/categories";
import { commentsHandler } from "@ssms/server/handlers/comments";
import { departmentsHandler } from "@ssms/server/handlers/departments";
import { divisionsHandler } from "@ssms/server/handlers/divisions";
import { officesHandler } from "@ssms/server/handlers/offices";
import { subCategoriesHandler } from "@ssms/server/handlers/subCategories";
import { supportTypesHandler } from "@ssms/server/handlers/supportTypes";
import { ticketsHandler } from "@ssms/server/handlers/tickets";
import { hc } from "hono/client";

export const $offices = hc<typeof officesHandler>("/api/v1/offices");

export const $departments = hc<typeof departmentsHandler>("/api/v1/departments");

export const $divisions = hc<typeof divisionsHandler>("/api/v1/divisions");

export const $categories = hc<typeof categoriesHandler>("/api/v1/categories");

export const $subCategories = hc<typeof subCategoriesHandler>("/api/v1/sub-categories");

export const $supportTypes = hc<typeof supportTypesHandler>("/api/v1/support-types");

export const $tickets = hc<typeof ticketsHandler>("/api/v1/tickets");

export const $comments = hc<typeof commentsHandler>("/api/v1/comments");
