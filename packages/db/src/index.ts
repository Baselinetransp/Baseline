import { env } from "@baseline/env/server";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../prisma/generated/client";

// 1. Export everything (Enums, Types, etc.) from the generated client
export * from "../prisma/generated/client";

const databaseUrl: string = env.DATABASE_URL;
const url: URL = new URL(databaseUrl);
const connectionConfig = {
  host: url.hostname,
  port: parseInt(url.port || "3306"),
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1),
};

const adapter = new PrismaMariaDb(connectionConfig);
const prisma = new PrismaClient({ adapter });

// 2. Keep your default export for the instance
export default prisma;