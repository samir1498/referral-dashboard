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
    name: varchar('name', { length: 255 }).notNull(),
    company: varchar('company', { length: 255 }),
    testimonial: text('testimonial').notNull(),
    avatar: varchar('avatar', { length: 255 }),
});

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    avatar: varchar('avatar', { length: 255 }),
});