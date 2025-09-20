import { NextResponse } from "next/server";
import { db } from "@/infrastructure/db/connection";
import { users } from "@/infrastructure/db/schema";

export async function GET() {
  const allUsers = await db.select().from(users);
  return NextResponse.json(allUsers);
}
