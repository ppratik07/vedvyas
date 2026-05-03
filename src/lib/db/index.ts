import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Singleton pattern — prevents multiple connections during Next.js hot reload
declare global {
  // eslint-disable-next-line no-var
  var _pgClient: postgres.Sql | undefined;
}

const connectionString = process.env.DATABASE_URL!;

// `prepare: false` required for Supabase connection pooler (Transaction mode)
const client = globalThis._pgClient ?? postgres(connectionString, { prepare: false });
if (process.env.NODE_ENV !== "production") globalThis._pgClient = client;

export const db = drizzle(client, { schema });
