import { ReferralRepositoryDrizzle } from "@/infrastructure/repositories/ReferralRepositoryDrizzle";
import ReferralTable from "@/interface/ui/components/ReferralTable";

export default async function ReferralsPage() {
  const repo = new ReferralRepositoryDrizzle();
  const referrals = await repo.findAll();
  console.log(referrals);
  const items = referrals.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email.toString(),
    date: r.date.toISOString(),
    status: r.status,
  }));
  return (
    <div>
      <h1 className="text-2xl font-bold">Referrals</h1>
      <ReferralTable items={items} />
    </div>
  );
}
