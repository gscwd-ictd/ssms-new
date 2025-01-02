import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schemas/*.ts",
  out: "./src/server/db/migrations",
  dbCredentials: {
    host: "localhost",
    port: 5435,
    user: "admin",
    password: "password",
    database: "ssms",
    ssl: false,
  },
});
