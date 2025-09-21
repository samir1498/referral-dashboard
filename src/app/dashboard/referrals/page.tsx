// app/referrals/page.tsx
import { getReferrals, getUsers } from "./actions";
import { AddReferral } from "@/interface/ui/components/AddReferral";
import ReferralTable from "@/interface/ui/components/ReferralTable";

export const dynamic = "force-dynamic";

export default async function ReferralsPage() {
  const referrals = await getReferrals();
  const users = await getUsers();

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

  const plainUsers = users.map((user) => ({
    id: String(user.id),
    name: user.name,
    email: String(user.email),
  }));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Referrals</h1>
        <AddReferral users={plainUsers} />
      </div>
      <ReferralTable items={plainReferrals} />
    </div>
  );
}
