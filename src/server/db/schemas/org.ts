import { generateRandomString } from "better-auth/crypto";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const office = pgTable("office", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  name: text("name").notNull().unique(),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }),
});

export const department = pgTable("department", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  officeId: text("office_id").references(() => office.id),
  name: text("name").notNull().unique(),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }),
});

export const division = pgTable("division", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  departmentId: text("department_id").references(() => department.id),
  name: text("name").notNull().unique(),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }),
});
