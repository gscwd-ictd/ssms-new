import { Hono } from "hono";

export const healthcheckHandler = new Hono().get("/", async (c) => {
  return c.json({ status: "ok" });
});
