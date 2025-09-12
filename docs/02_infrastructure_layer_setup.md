# Feature: Infrastructure Layer Setup

This feature covers setting up Drizzle ORM, defining the database schema, and implementing the data repositories.

## 3. Infrastructure Layer (`/src/infrastructure`)

- Implementation details: database, ORM, adapters.
- **Database**
  - Drizzle ORM + Postgres.
  - Schema definitions (`/src/infrastructure/db/schema.ts`).
  - Drizzle connection (`/src/infrastructure/db/connection.ts`).
- **Repositories**
  - `ReferralRepositoryDrizzle`
  - `TestimonialRepositoryDrizzle`
  - Both implement **Domain repository interfaces**.

## 📂 Project Structure

- src/
  - infrastructure/
    - db/
      - schema.ts
      - connection.ts
    - repositories/
      - ReferralRepositoryDrizzle.ts
      - TestimonialRepositoryDrizzle.ts

## 🗄 Infrastructure: Drizzle ORM

### Schema

```ts
// src/infrastructure/db/schema.ts
import { pgTable, serial, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const referralStatus = pgEnum("referral_status", ["Pending", "Converted"]);

export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  date: timestamp("date").defaultNow().notNull(),
  status: referralStatus.default("Pending").notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  quote: varchar("quote", { length: 500 }).notNull(),
  author: varchar("author", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
});
```

### Repository Example

```ts
// src/infrastructure/repositories/ReferralRepositoryDrizzle.ts
import { IReferralRepository } from "@/domain/repositories/IReferralRepository";
import { db } from "../db/connection";
import { referrals } from "../db/schema";
import { Referral } from "@/domain/entities/Referral";
import { Email } from "@/domain/value-objects/Email";
import { eq } from "drizzle-orm";

export class ReferralRepositoryDrizzle implements IReferralRepository {
  async save(referral: Referral): Promise<void> {
    await db.insert(referrals).values({
      name: referral.name,
      email: referral.email.toString(),
      date: referral.date,
      status: referral.status,
    });
  }

  async findAll(): Promise<Referral[]> {
    const rows = await db.select().from(referrals);
    return rows.map(
      (r) => new Referral(r.id.toString(), r.name, new Email(r.email), r.date, r.status as any)
    );
  }
}
```
