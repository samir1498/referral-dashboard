# Feature: API Layer - Testimonials

This feature covers implementing the Next.js API routes for managing testimonials.

## 4. Interface Layer (`/src/interface`)

- UI + API (Next.js App Router).
- **API Routes**
  - `app/api/testimonials/route.ts` → calls use cases.

## 📂 Project Structure

- src/
  - interface/
    - api/
      - testimonials/route.ts

## 🌐 Interface Layer (Next.js)

### API Route Example (for testimonials)

*Note: This is an example based on the referrals API. The implementation will be similar for testimonials.*

```ts
// app/api/testimonials/route.ts
import { NextResponse } from "next/server";
import { TestimonialRepositoryDrizzle } from "@/infrastructure/repositories/TestimonialRepositoryDrizzle";
import { AddTestimonialUseCase } from "@/application/use-cases/AddTestimonialUseCase";
import { ListTestimonialsUseCase } from "@/application/use-cases/ListTestimonialsUseCase";

const repo = new TestimonialRepositoryDrizzle();

export async function GET() {
  const useCase = new ListTestimonialsUseCase(repo);
  const data = await useCase.execute();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  const useCase = new AddTestimonialUseCase(repo);
  const testimonial = await useCase.execute(body);
  return NextResponse.json(testimonial, { status: 201 });
}
```
