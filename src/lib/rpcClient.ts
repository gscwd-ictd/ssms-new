import { categoriesHandler } from "@ssms/server/handlers/categories";
import { commentsHandler } from "@ssms/server/handlers/comments";
import { dashboardHandler } from "@ssms/server/handlers/dashboard";
import { departmentsHandler } from "@ssms/server/handlers/departments";
import { divisionsHandler } from "@ssms/server/handlers/divisions";
import { officesHandler } from "@ssms/server/handlers/offices";
import { reportsHandler } from "@ssms/server/handlers/reports";
import { subCategoriesHandler } from "@ssms/server/handlers/subCategories";
import { supportTypesHandler } from "@ssms/server/handlers/supportTypes";
import { teamsHandler } from "@ssms/server/handlers/teams";
import { ticketsHandler } from "@ssms/server/handlers/tickets";
import { usersHandler } from "@ssms/server/handlers/users";
import { hc } from "hono/client";

export const $offices = hc<typeof officesHandler>("/api/v1/offices");

export const $departments = hc<typeof departmentsHandler>("/api/v1/departments");

export const $divisions = hc<typeof divisionsHandler>("/api/v1/divisions");

export const $categories = hc<typeof categoriesHandler>("/api/v1/categories");

export const $subCategories = hc<typeof subCategoriesHandler>("/api/v1/sub-categories");

export const $supportTypes = hc<typeof supportTypesHandler>("/api/v1/support-types");

export const $tickets = hc<typeof ticketsHandler>("/api/v1/tickets");

export const $comments = hc<typeof commentsHandler>("/api/v1/comments");

export const $users = hc<typeof usersHandler>("/api/v1/users");

export const $dashboard = hc<typeof dashboardHandler>("/api/v1/dashboard");

export const $reports = hc<typeof reportsHandler>("/api/v1/reports");

export const $teams = hc<typeof teamsHandler>("/api/v1/teams");
