import { categoriesHandler } from "@ssms/server/handlers/categories";
import { commentsHandler } from "@ssms/server/handlers/comments";
import { departmentHandler } from "@ssms/server/handlers/departments";
import { divisionHandler } from "@ssms/server/handlers/divisions";
import { healthcheckHandler } from "@ssms/server/handlers/healthcheck";
import { officeHandler } from "@ssms/server/handlers/offices";
import { subCategoriesHandler } from "@ssms/server/handlers/subCategories";
import { supportTypesHandler } from "@ssms/server/handlers/supportTypes";
import { ticketsHandler } from "@ssms/server/handlers/tickets";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api/v1");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("healthcheck", healthcheckHandler)
  .route("/offices", officeHandler)
  .route("/departments", departmentHandler)
  .route("/divisions", divisionHandler)
  .route("/categories", categoriesHandler)
  .route("/sub-categories", subCategoriesHandler)
  .route("/support-types", supportTypesHandler)
  .route("/tickets", ticketsHandler)
  .route("/comments", commentsHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
