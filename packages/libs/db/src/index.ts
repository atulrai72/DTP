import { drizzle }  from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const pool = globalForDb.conn ?? new Pool({ 
  connectionString,
  max: process.env.NODE_ENV === 'production' ? 20 : 1 
});

if (process.env.NODE_ENV !== "production") {
  globalForDb.conn = pool;
}

export const db = drizzle(pool, { schema });

export * from "./schema";

export { eq, and, or, like, desc, asc } from "drizzle-orm";