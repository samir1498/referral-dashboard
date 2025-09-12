# Feature: API Layer - Referrals

This feature covers implementing the Next.js API routes for managing referrals.

## 4. Interface Layer (`/src/interface`)

- UI + API (Next.js App Router).
- **API Routes**
  - `app/api/referrals/route.ts` → calls use cases.

## 📂 Project Structure

- src/
  - interface/
    - api/
      - referrals/route.ts

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
