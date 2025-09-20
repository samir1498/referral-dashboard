import { NextResponse } from "next/server";
import { ReferralRepositoryDrizzle } from "@/infrastructure/repositories/ReferralRepositoryDrizzle";
import { UserRepositoryDrizzle } from "@/infrastructure/repositories/UserRepositoryDrizzle";
import { AddReferralUseCase } from "@/application/use-cases/AddReferralUseCase";
import { ListReferralsUseCase } from "@/application/use-cases/ListReferralsUseCase";
import { Referral } from "@/domain/entities/Referral";
import { Email } from "@/domain/value-objects/Email";
import { ReferralStatus } from "@/domain/value-objects/ReferralStatus";
import { User } from "@/domain/entities/User";

const referralRepo = new ReferralRepositoryDrizzle();
const userRepo = new UserRepositoryDrizzle();

export async function GET() {
  const useCase = new ListReferralsUseCase(referralRepo);
  const data = await useCase.execute();
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.name || !body.email || !body.referrerId) {
    return NextResponse.json(
      { error: "name, email and referrerId required" },
      { status: 400 }
    );
  }

  const useCase = new AddReferralUseCase(referralRepo, userRepo);

  const referralEntity = Referral.builder()
    .withId("")
    .withName(body.name)
    .withEmail(new Email(body.email))
    .withDate(new Date())
    .withStatus(ReferralStatus.Pending)
    .withReferrer({ id: body.referrerId } as User)
    .build();

  const referral = await useCase.execute(referralEntity);

  return NextResponse.json(referral, { status: 201 });
}
