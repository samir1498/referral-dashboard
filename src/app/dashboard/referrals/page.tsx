import { Referral } from "@/domain/entities/Referral";
import { ReferralRepositoryDrizzle } from "@/infrastructure/repositories/ReferralRepositoryDrizzle";
import { AddReferral } from "@/interface/ui/components/AddReferral";
import ReferralTable from "@/interface/ui/components/ReferralTable";

export default async function ReferralsPage() {
  const repo = new ReferralRepositoryDrizzle();
  const referrals = await repo.findAll();
  const plainReferrals = referrals.map((referral) => ({
    id: referral.id,
    name: referral.name,
    email: referral.email.toString(),
    date: referral.date,
    status: referral.status,
    referrer: {
      id: referral?.referrer?.id,
      name: referral?.referrer?.name,
      email: referral?.referrer?.email,
    },
  }));
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Referrals</h1>
        <AddReferral />
      </div>
      <ReferralTable items={plainReferrals} />
    </div>
  );
}
