import { pgTable, serial, varchar, timestamp, pgEnum, text, integer } from 'drizzle-orm/pg-core';

export const referralStatus = pgEnum('referral_status', ['Pending', 'Converted']);

export const referrals = pgTable('referrals', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    date: timestamp('date').defaultNow().notNull(),
    status: referralStatus().default('Pending').notNull(),
    referrerId: integer('referrer_id')
    .references(() => users.id)
    .notNull(),
});

export const testimonials = pgTable('testimonials', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 255 }).notNull(), // Assuming userId is a string, adjust if it's an integer
    clientName: varchar('client_name', { length: 255 }).notNull(),
    companyName: varchar('company_name', { length: 255 }),
    content: text('content').notNull(),
    rating: integer('rating').notNull(),
    status: varchar('status', { length: 255 }).notNull(), // Assuming status is a string, adjust if it's an enum
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    avatar: varchar('avatar', { length: 255 }),
});