# Referral Dashboard – Clean Architecture + DDD Spec

This document specifies the architecture and implementation plan for the **Referral Dashboard**, a demo SaaS-like dashboard built with **Next.js 15**, **Drizzle ORM**, and **TypeScript**.

It follows **Clean Architecture** and **Domain-Driven Design (DDD)** to ensure separation of concerns, testability, and scalability.

---

## 🎯 Goals

- Build a professional-looking referral dashboard (Overview, Referrals, Testimonials).
- Use **Clean Architecture layers**:
  - **Domain Layer** → Core business logic, aggregates, value objects.
  - **Application Layer** → Use cases (application services).
  - **Infrastructure Layer** → Drizzle ORM, database, external services.
  - **Interface Layer** → Next.js UI (pages, API routes).
- Use **DDD practices**:
  - Entities, Value Objects, Aggregates.
  - Repositories as abstractions.
  - Services (domain/application).
  - Ubiquitous language (referrals, testimonials).

---

## 🏗 Architecture Layers

### 1. Domain Layer (`/src/domain`)

- Pure business logic, no framework dependencies.
- **Entities**
  - `Referral` → represents a referral made by a user.
  - `Testimonial` → represents customer testimonial.
- **Value Objects**
  - `Email` → encapsulates email validation.
  - `ReferralStatus` → enum: `Pending | Converted`.
- **Aggregates**
  - `ReferralAggregate` → referral + status transitions.
- **Domain Services**
  - `ReferralService` → rules for adding/updating referrals.
  - `TestimonialService` → rules for adding testimonials.

---

### 2. Application Layer (`/src/application`)

- Coordinates use cases (business workflows).
- **Use Cases**
  - `AddReferralUseCase`
  - `ListReferralsUseCase`
  - `AddTestimonialUseCase`
  - `ListTestimonialsUseCase`
- Depends on **Domain** and **Repository Interfaces**.

---

### 3. Infrastructure Layer (`/src/infrastructure`)

- Implementation details: database, ORM, adapters.
- **Database**
  - Drizzle ORM + Postgres.
  - Schema definitions (`/src/infrastructure/db/schema.ts`).
  - Drizzle connection (`/src/infrastructure/db/connection.ts`).
- **Repositories**
  - `ReferralRepositoryDrizzle`
  - `TestimonialRepositoryDrizzle`
  - Both implement **Domain repository interfaces**.

---

### 4. Interface Layer (`/src/interface`)

- UI + API (Next.js App Router).
- **API Routes**
  - `app/api/referrals/route.ts` → calls use cases.
  - `app/api/testimonials/route.ts` → calls use cases.
- **Pages**
  - `/dashboard/overview`
  - `/dashboard/referrals`
  - `/dashboard/testimonials`
- **Components**
  - `ReferralTable`
  - `TestimonialCard`
  - `Sidebar`, `Navbar`

---

## 📂 Project Structure

- src/
  - domain/
    - entities/
      - Referral.ts
      - Testimonial.ts
    - value-objects/
      - Email.ts
      - ReferralStatus.ts
    - services/
      - ReferralService.ts
      - TestimonialService.ts
    - repositories/
      - IReferralRepository.ts
      - ITestimonialRepository.ts
  - application/
    - use-cases/
      - AddReferralUseCase.ts
      - ListReferralsUseCase.ts
      - AddTestimonialUseCase.ts
      - ListTestimonialsUseCase.ts
  - infrastructure/
    - db/
      - schema.ts
      - connection.ts
    - repositories/
      - ReferralRepositoryDrizzle.ts
      - TestimonialRepositoryDrizzle.ts
  - interface/
    - api/
      - referrals/route.ts
      - testimonials/route.ts
    - ui/
      - components/
        - ReferralTable.tsx
        - TestimonialCard.tsx
        - Sidebar.tsx
        - Navbar.tsx

---

## 🧩 Domain Models (examples)

### Referral Entity

```ts
// src/domain/entities/Referral.ts
import { Email } from "../value-objects/Email";
import { ReferralStatus } from "../value-objects/ReferralStatus";

export class Referral {
  constructor(
    public readonly id: string,
    public name: string,
    public email: Email,
    public date: Date,
    public status: ReferralStatus = ReferralStatus.Pending
  ) {}

  convert() {
    this.status = ReferralStatus.Converted;
  }
}
```

### Value Object: Email

```ts
// src/domain/value-objects/Email.ts
export class Email {
  private readonly value: string;
  constructor(value: string) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      throw new Error("Invalid email");
    }
    this.value = value;
  }
  toString() {
    return this.value;
  }
}
```

---

## 📦 Application Use Cases (examples)

### AddReferralUseCase

```ts
// src/application/use-cases/AddReferralUseCase.ts
import { IReferralRepository } from "@/domain/repositories/IReferralRepository";
import { Referral } from "@/domain/entities/Referral";
import { Email } from "@/domain/value-objects/Email";

export class AddReferralUseCase {
  constructor(private repo: IReferralRepository) {}

  async execute(input: { name: string; email: string }) {
    const referral = new Referral(
      crypto.randomUUID(),
      input.name,
      new Email(input.email),
      new Date()
    );
    await this.repo.save(referral);
    return referral;
  }
}
```

---

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

---

## 🌐 Interface Layer (Next.js)

### API Route Example

```ts
// app/api/referrals/route.ts
import { NextResponse } from "next/server";
import { ReferralRepositoryDrizzle } from "@/infrastructure/repositories/ReferralRepositoryDrizzle";
import { AddReferralUseCase } from "@/application/use-cases/AddReferralUseCase";
import { ListReferralsUseCase } from "@/application/use-cases/ListReferralsUseCase";

const repo = new ReferralRepositoryDrizzle();

export async function GET() {
  const useCase = new ListReferralsUseCase(repo);
  const data = await useCase.execute();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const useCase = new AddReferralUseCase(repo);
  const referral = await useCase.execute(body);
  return NextResponse.json(referral, { status: 201 });
}
```

---

## ✅ Testing Strategy

- **Domain tests** (unit, no infra): test `Referral`, `Email`, `ReferralService`.
- **Application tests**: mock repositories, test `AddReferralUseCase`, etc.
- **Infrastructure tests**: integration tests with Drizzle against a test DB (Docker Postgres).
- **E2E tests**: Playwright → test API + UI flows.

---

## 🚀 Deployment

- Use Vercel for frontend/API hosting.
- Use Neon/Supabase for Postgres DB.
- Run migrations with drizzle-kit before deploy.

---

## 📅 Suggested Timeline

- **Day 1** → Domain + Application layers, Drizzle schema setup.
- **Day 2** → Infrastructure Repositories, API routes, test scaffolding.
- **Day 3** → UI dashboard pages + Playwright E2E.
- **Day 4 (optional)** → Add auth, role-based access, tenant IDs.

---

## End of Spec
