import { Referral } from "@/domain/entities/Referral";
import { ReferralRepositoryDrizzle } from "@/infrastructure/repositories/ReferralRepositoryDrizzle";
import { AddReferral } from "@/interface/ui/components/AddReferral";
import ReferralTable from "@/interface/ui/components/ReferralTable";

export default async function ReferralsPage() {
  const repo = new ReferralRepositoryDrizzle();
  const referrals = await repo.findAll();
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Referrals</h1>
        <AddReferral />
      </div>
      <ReferralTable items={referrals} />
    </div>
  );
}
