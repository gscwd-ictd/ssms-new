import { db } from "@ssms/lib/drizzle";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { user } from "../db/schemas/auth";

export const usersHandler = new Hono().get("/list-summary", async (c) => {
  try {
    const stmt = db
      .select({
        id: user.id,
        name: user.name,
        image: user.image,
      })
      .from(user)
      .prepare("user_list_summary");

    const res = await stmt.execute();

    return c.json(res);
  } catch (error) {
    console.error(error);
    throw new HTTPException(401, { message: "Something went wrong!", cause: error });
  }
});
