// db/drizzle.ts

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Create Neon SQL client
const sql = neon(process.env.DATABASE_URL!);

// Drizzle client with schema
const drizzleDb = drizzle(sql, { schema });

// Export it as default
export default drizzleDb;
