import "./lib/load-env";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Use process.env (not env()) so `prisma generate` works in CI/Vercel
    // when DATABASE_URL is not set yet. Migrate/db commands still require it.
    url: process.env.DATABASE_URL,
  },
});
