import { generateRandomString } from "better-auth/crypto";
import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const statusEnum = pgEnum("status", ["open", "closed", "ongoing", "cancelled", "resolved"]);

export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdateFn(() => new Date()),
});

export const subCategories = pgTable("sub_categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  categoryId: text("category_id").references(() => categories.id),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdateFn(() => new Date()),
});

export const supportTypes = pgTable("support_types", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdateFn(() => new Date()),
});

export const tickets = pgTable("tickets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  requestorId: text("requestor_id").references(() => user.id),
  assignedId: text("assigned_id").references(() => user.id),
  categoryId: text("category_id").references(() => categories.id),
  subCategoryId: text("sub_category_id").references(() => subCategories.id),
  supportTypeId: text("support_type_id").references(() => supportTypes.id),
  details: text("details").notNull(),
  assessment: text("assessment"),
  action: text("action"),
  status: statusEnum("status").default("open").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdateFn(() => new Date()),
});

export const comments = pgTable("comments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  userId: text("user_id").references(() => user.id),
  ticketId: text("ticket_id").references(() => tickets.id),
  details: text("details").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdateFn(() => new Date()),
});
