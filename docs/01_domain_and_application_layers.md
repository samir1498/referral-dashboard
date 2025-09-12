# Feature: Domain and Application Layers

This feature covers the setup of the core business logic using Clean Architecture and Domain-Driven Design principles.

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

### 2. Application Layer (`/src/application`)

- Coordinates use cases (business workflows).
- **Use Cases**
  - `AddReferralUseCase`
  - `ListReferralsUseCase`
  - `AddTestimonialUseCase`
  - `ListTestimonialsUseCase`
- Depends on **Domain** and **Repository Interfaces**.

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
    if (!/^[^S@]+@[^S@]+\.[^S@]+$/.test(value)) {
      throw new Error("Invalid email");
    }
    this.value = value;
  }
  toString() {
    return this.value;
  }
}
```

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
