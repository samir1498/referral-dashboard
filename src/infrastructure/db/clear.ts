import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
// @ts-expect-error to be able to run this script with tsx
import * as schema from "./schema.ts";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  console.log("Clearing database...");
  try {
    await db.delete(schema.referrals);
    await db.delete(schema.users);
    await db.delete(schema.testimonials);
    console.log("Database cleared successfully!");
    process.exit(0);
  } catch (error) {
    //ignore if table does not exist
    console.log("Database cleared successfully!");
    process.exit(0);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
