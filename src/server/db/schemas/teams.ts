import { generateRandomString } from "better-auth/crypto";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { categories } from "./tickets";
import { user } from "./auth";

export const teams = pgTable("teams", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),

  name: text("name").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdateFn(() => new Date()),
});

export const categoryAssignments = pgTable("category_assignments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  teamId: text("team_id").references(() => teams.id),
  categoryId: text("category_id").references(() => categories.id),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdateFn(() => new Date()),
});

export const teamAssignments = pgTable("team_assignments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  teamId: text("team_id").references(() => teams.id),
  userId: text("user_id").references(() => user.id),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdateFn(() => new Date()),
});
