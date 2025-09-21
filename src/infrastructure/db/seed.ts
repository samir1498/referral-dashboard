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

function getRandomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

async function main() {
  console.log('Seeding database...');

  // Clear existing data to ensure a clean slate
  await db.delete(schema.testimonials);
  await db.delete(schema.referrals);
  await db.delete(schema.users);

  console.log('Cleared existing data.');

  // Seed users
  const usersToSeed = [
    { name: "Alice", email: "alice@example.com", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
    { name: "Bob", email: "bob@example.com", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { name: "Charlie", email: "charlie@example.com", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
    { name: "David", email: "david@example.com", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024e" },
    { name: "Eve", email: "eve@example.com", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e" },
    { name: "Frank", email: "frank@example.com", avatar: "https://i.pravatar.cc/150?u=a04258114e29026702e" },
    { name: "Grace", email: "grace@example.com", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024f" },
    { name: "Heidi", email: "heidi@example.com", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704f" },
  ];

  const users = await db.insert(schema.users).values(usersToSeed).returning();

  // Seed Referrals
  const referralStatuses = ['Converted', 'Pending'];
  const referralsToInsert = [];
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);

  for (let i = 0; i < 100; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomStatus = referralStatuses[Math.floor(Math.random() * referralStatuses.length)];
    const randomDate = getRandomDate(sixMonthsAgo, today);
    referralsToInsert.push({
      name: `Referral ${i + 1}`,
      email: `referral${i + 1}@example.com`,
      status: randomStatus,
      referrerId: randomUser.id,
      date: randomDate,
    });
  }

  const insertedReferrals = await db.insert(schema.referrals).values(referralsToInsert).returning({ id: schema.referrals.id });
  console.log(`Seeded ${insertedReferrals.length} referrals.`);

  // Seed Testimonials
  const testimonialStatuses = ['Approved', 'Pending'];
  const testimonialsToInsert = [];

  for (let i = 0; i < 30; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomRating = Math.floor(Math.random() * 5) + 1; // 1-5
    const randomStatus = testimonialStatuses[Math.floor(Math.random() * testimonialStatuses.length)];
    const randomCreatedAt = getRandomDate(sixMonthsAgo, today);
    const randomUpdatedAt = getRandomDate(randomCreatedAt, today);

    testimonialsToInsert.push({
      userId: randomUser.id.toString(),
      clientName: `Client ${i + 1}`,
      companyName: `Company ${i + 1}`,
      content: `This is a great testimonial from Client ${i + 1} about Company ${i + 1}.`,
      rating: randomRating,
      status: randomStatus,
      createdAt: randomCreatedAt,
      updatedAt: randomUpdatedAt,
    });
  }

  const insertedTestimonials = await db.insert(schema.testimonials).values(testimonialsToInsert).returning({ id: schema.testimonials.id });
  console.log(`Seeded ${insertedTestimonials.length} testimonials.`);

  console.log('Database seeding complete. ✅');

  // End the pool connection
  await pool.end();
}

main().catch((err) => {
  console.error('Error during seeding:', err);
  process.exit(1);
});
