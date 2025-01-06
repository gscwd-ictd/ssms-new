import { generateRandomString } from "better-auth/crypto";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const categories = pgTable("categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }),
});

export const subCategories = pgTable("sub_categories", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  categoryId: text("category_id").references(() => categories.id),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }),
});

export const supportTypes = pgTable("support_types", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }),
});

export const tickets = pgTable("tickets", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  userId: text("user_id").references(() => user.id),
  categoryId: text("category_id").references(() => categories.id),
  subCategoryId: text("sub_category_id").references(() => subCategories.id),
  supportTypeId: text("support_type_id").references(() => supportTypes.id),
  details: text("details").notNull(),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }),
});

export const comments = pgTable("comments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateRandomString(28, "a-z", "A-Z", "0-9")),
  userId: text("user_id").references(() => user.id),
  ticketId: text("ticket_id").references(() => tickets.id),
  details: text("details").notNull(),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp({ mode: "date" }),
});
