import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas",
  out: "./src/db/migrations",
  dbCredentials: {
    host: "localhost",
    port: 5435,
    user: "admin",
    password: "password",
    database: "ssms",
    ssl: false,
  },
});
