import type { Config } from "drizzle-kit";
import "dotenv/config";
import { parse } from "pg-connection-string";

const config = parse(process.env.DATABASE_URL!);

export default {
  schema: "./db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: config.host!,
    port: config.port ? Number(config.port) : 5432, // ✅ default port
    user: config.user!,
    password: config.password!,
    database: config.database!,
    ssl: true,
  },
} satisfies Config;
