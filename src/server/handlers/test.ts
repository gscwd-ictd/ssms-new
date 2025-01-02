import { db } from "@ssms/lib/drizzle";
import { Hono } from "hono";
import { department, division, office } from "../db/schemas/org";

export const testHandler = new Hono().post("/", async (c) => {
  const newOffice = await db
    .insert(division)
    .values({
      departmentId: "vkvegmanffdwqkraguxlpxwfaxyc",
      name: "Environment and Watershed Protection Division",
    })
    .returning({
      id: division.id,
      name: division.name,
      createdAt: division.createdAt,
      updatedAt: division.updatedAt,
    })
    .execute();

  return c.json(newOffice);
});
