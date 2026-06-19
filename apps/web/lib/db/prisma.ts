import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaGeneration: number | undefined;
};

/** Bump when Prisma schema/client shape changes to avoid stale dev singletons. */
const PRISMA_CLIENT_GENERATION = 2;

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export function getPrisma(): PrismaClient {
  if (
    !globalForPrisma.prisma ||
    globalForPrisma.prismaGeneration !== PRISMA_CLIENT_GENERATION
  ) {
    if (globalForPrisma.prisma) {
      void globalForPrisma.prisma.$disconnect().catch(() => undefined);
    }

    globalForPrisma.prisma = createPrismaClient();
    globalForPrisma.prismaGeneration = PRISMA_CLIENT_GENERATION;
  }

  return globalForPrisma.prisma;
}

/** Lazy Prisma client — defers connection until first use (build-safe). */
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, property, receiver) {
    return Reflect.get(getPrisma(), property, receiver);
  },
});
