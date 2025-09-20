import { NextResponse } from "next/server";
import { ReferralRepositoryDrizzle } from "@/infrastructure/repositories/ReferralRepositoryDrizzle";
import { UserRepositoryDrizzle } from "@/infrastructure/repositories/UserRepositoryDrizzle";
import { AddReferralUseCase } from "@/application/use-cases/AddReferralUseCase";
import { ListReferralsUseCase } from "@/application/use-cases/ListReferralsUseCase";

const referralRepo = new ReferralRepositoryDrizzle();
const userRepo = new UserRepositoryDrizzle();

export async function GET() {
  const useCase = new ListReferralsUseCase(referralRepo);
  const data = await useCase.execute();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name || !body.email || !body.referrerId)
    return NextResponse.json(
      { error: "name, email and referrerId required" },
      { status: 400 }
    );
  const useCase = new AddReferralUseCase(referralRepo, userRepo);
  const referral = await useCase.execute({
    name: body.name,
    email: body.email,
    referrerId: body.referrerId,
  });
  return NextResponse.json(referral, { status: 201 });
}
