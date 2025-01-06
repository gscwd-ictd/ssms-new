import { db } from "@ssms/lib/drizzle";
import { Hono } from "hono";
import { division, office, department } from "../db/schemas/org";

export const testHandler = new Hono().post("/", async (c) => {
  const newOffice = await db
    .insert(division)
    .values({
      departmentId: "uefglvaisbhybmilfobpcakhjlsv",
      name: "Information and Communications Technology Department",
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
