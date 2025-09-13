import { IReferralRepository } from "@/domain/repositories/IReferralRepository";
import { Referral } from "@/domain/entities/Referral";
import { Email } from "@/domain/value-objects/Email";
import { db } from "../db/connection";
import { referrals } from "../db/schema";
import { desc, eq } from 'drizzle-orm';

export class ReferralRepositoryDrizzle implements IReferralRepository {
    async save(referral: Referral) {
        await db.insert(referrals).values({
            name: referral.name,
            email: referral.email.toString(),
            date: referral.date,
            status: referral.status
        });
    }
    async findAll(): Promise<Referral[]> {
        const rows = await db.select().from(referrals).orderBy(desc(referrals.date));
        return rows.map(r =>
            new Referral(String(r.id), r.name, new Email(r.email), new Date(r.date), r.status as Referral['status'])
        );
    }
    async findById(id: string) {
        const row = await db.select().from(referrals).where(eq(referrals.id,Number(id))).then(res => res[0]);
        if (!row) return null;
        return new Referral(String(row.id), row.name, new Email(row.email), new Date(row.date), row.status as Referral['status']);
    }
}