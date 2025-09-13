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
    if (!body.name || !body.email) return NextResponse.json({ error: "name & email required" }, { status: 400 });
    const useCase = new AddReferralUseCase(repo);
    const referral = await useCase.execute({ name: body.name, email: body.email });
    return NextResponse.json(referral, { status: 201 });
}