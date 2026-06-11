import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Load `.env` then `.env.local` (local overrides). Used by Prisma CLI and scripts. */
export function loadAppEnv() {
  const envPath = resolve(appRoot, ".env");
  const envLocalPath = resolve(appRoot, ".env.local");

  if (existsSync(envPath)) {
    loadEnv({ path: envPath });
  }
  if (existsSync(envLocalPath)) {
    loadEnv({ path: envLocalPath, override: true });
  }
}

loadAppEnv();
