import { healthcheckHandler } from "@ssms/server/handlers/healthcheck";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api/v1");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("healthcheck", healthcheckHandler);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
