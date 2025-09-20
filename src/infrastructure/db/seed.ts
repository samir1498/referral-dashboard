import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import 'dotenv/config';

// @ts-expect-error to be able to run this script with tsx
import * as schema from './schema.ts';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// Use a separate pool for the seed script
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  console.log('Seeding database...');

  // Clear existing data to ensure a clean slate
  await db.delete(schema.testimonials);
  await db.delete(schema.referrals);

  console.log('Cleared existing data.');

  // Seed users
  const users = await db
    .insert(schema.users)
    .values([
      {
        name: "Alice",
        email: "alice@example.com",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
      },
      {
        name: "Bob",
        email: "bob@example.com",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      },
      {
        name: "Charlie",
        email: "charlie@example.com",
        avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      },
    ])
    .returning();

  // Seed Referrals
  const insertedReferrals = await db
    .insert(schema.referrals)
    .values([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        status: 'Converted',
        referrerId: users[0].id,
      },
      {
        name: 'Bob Williams',
        email: 'bob@example.com',
        status: 'Pending',
        referrerId: users[1].id,
      },
      {
        name: 'Charlie Brown',
        email: 'charlie@example.com',
        status: 'Pending',
        referrerId: users[0].id,
      },
      {
        name: 'Diana Miller',
        email: 'diana@example.com',
        status: 'Converted',
        referrerId: users[1].id,
      },
      {
        name: 'Ethan Davis',
        email: 'ethan@example.com',
        status: 'Pending',
        referrerId: users[0].id,
      },
    ])
    .returning({ id: schema.referrals.id });

  console.log(`Seeded ${insertedReferrals.length} referrals.`);

  // Seed Testimonials
  const insertedTestimonials = await db
    .insert(schema.testimonials)
    .values([
      {
        userId: users[0].id.toString(),
        clientName: 'Alice Johnson',
        companyName: 'Tech Corp',
        content: 'This service is amazing! It completely changed how we approach our workflow.',
        rating: 5,
        status: 'Approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: users[1].id.toString(),
        clientName: 'Diana Miller',
        companyName: 'Innovate LLC',
        content: 'A fantastic experience from start to finish. The results speak for themselves. Highly recommended!',
        rating: 4,
        status: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    .returning({ id: schema.testimonials.id });

  console.log(`Seeded ${insertedTestimonials.length} testimonials.`);

  console.log('Database seeding complete. ✅');

  // End the pool connection
  await pool.end();
}

main().catch((err) => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
