import { IReferralRepository } from "@/domain/repositories/IReferralRepository";
import { Referral } from "@/domain/entities/Referral";
import { Email } from "@/domain/value-objects/Email";
import { db } from "../db/connection";
import { referrals, users } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { User } from "@/domain/entities/User";

export class ReferralRepositoryDrizzle implements IReferralRepository {
  async save(referral: Referral): Promise<void> {
    const referrerId = referral.referrer ? parseInt(referral.referrer.id, 10) : undefined;
    await db.insert(referrals).values({
      name: referral.name as string,
      email: referral.email.toString() as string,
      date: referral.date,
      status: referral.status,
      referrerId: referrerId as number,
    });
  }

  async findAll(): Promise<Referral[]> {
    const rows = await db
      .select({
        id: referrals.id,
        name: referrals.name,
        email: referrals.email,
        date: referrals.date,
        status: referrals.status,
        referrer: {
          id: users.id,
          name: users.name,
          email: users.email,
          avatar: users.avatar,
        },
      })
      .from(referrals)
      .leftJoin(users, eq(referrals.referrerId, users.id))
      .orderBy(desc(referrals.date));

    return rows.map((r) => {
      const referrer =
        r?.referrer?.id && r.referrer.name && r.referrer.email
          ? new User(
            r.referrer.id.toString(),
            r.referrer.name,
            r.referrer.email,
            r.referrer.avatar
          )
          : undefined;

      return new Referral(
        String(r.id),
        r.name,
        new Email(r.email),
        new Date(r.date),
        r.status as Referral["status"],
        referrer
      );
    });
  }

  async findById(id: string): Promise<Referral | null> {
    const row = await db
      .select({
        id: referrals.id,
        name: referrals.name,
        email: referrals.email,
        date: referrals.date,
        status: referrals.status,
        referrer: {
          id: users.id,
          name: users.name,
          email: users.email,
          avatar: users.avatar,
        },
      })
      .from(referrals)
      .leftJoin(users, eq(referrals.referrerId, users.id))
      .where(eq(referrals.id, Number(id)))
      .then((res) => res[0]);

    if (!row) return null;

    const referrer =
      row?.referrer?.id && row.referrer.name && row.referrer.email
        ? new User(
          row.referrer.id.toString(),
          row.referrer.name,
          row.referrer.email,
          row.referrer.avatar
        )
        : undefined;

    return new Referral(
      String(row.id),
      row.name,
      new Email(row.email),
      new Date(row.date),
      row.status as Referral["status"],
      referrer
    );
  }

  async update(id: string, data: Partial<Referral>): Promise<Referral | null> {
    const [updatedReferral] = await db
      .update(referrals)
      .set({
        name: data.name,
        email: data.email?.toString(),
        date: data.date,
        status: data.status,
        referrerId: data.referrer?.id ? parseInt(data.referrer.id, 10) : undefined,
      })
      .where(eq(referrals.id, parseInt(id)))
      .returning();

    if (!updatedReferral) {
      return null;
    }

    // Re-fetch the full referral with referrer details to construct the Referral entity
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await db.delete(referrals).where(eq(referrals.id, parseInt(id)));
  }
}
