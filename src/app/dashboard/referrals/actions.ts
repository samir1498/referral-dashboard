"use server";

import { ReferralRepositoryDrizzle } from "@/infrastructure/repositories/ReferralRepositoryDrizzle";
import { AddReferralUseCase } from "@/application/use-cases/AddReferralUseCase";
import { EditReferralUseCase } from "@/application/use-cases/EditReferralUseCase";
import { DeleteReferralUseCase } from "@/application/use-cases/DeleteReferralUseCase";
import { ListReferralsUseCase } from "@/application/use-cases/ListReferralsUseCase";
import { Referral } from "@/domain/entities/Referral";
import { Email } from "@/domain/value-objects/Email";
import { ReferralStatus } from "@/domain/value-objects/ReferralStatus";
import { revalidatePath } from "next/cache";
import { UserRepositoryDrizzle } from "@/infrastructure/repositories/UserRepositoryDrizzle";
import { User } from "@/domain/entities/User";
import { ListUsersUseCase } from "@/application/use-cases/ListUsersUseCase";

const userRepository = new UserRepositoryDrizzle();
const referralRepository = new ReferralRepositoryDrizzle();

const addReferralUseCase = new AddReferralUseCase(referralRepository, userRepository);
const editReferralUseCase = new EditReferralUseCase(referralRepository);
const deleteReferralUseCase = new DeleteReferralUseCase(referralRepository);
const listReferralsUseCase = new ListReferralsUseCase(referralRepository);
const listUsersUseCase = new ListUsersUseCase(userRepository);


export async function getUsers(): Promise<User[]> {
  const users = await listUsersUseCase.execute();
  return users;
}

export async function getReferrals() {
  const referrals = await listReferralsUseCase.execute();

  return referrals.map((referral) => ({
    id: referral.id,
    name: referral.name,
    email: referral.email.toString(),
    date: referral.date,
    status: referral.status,
    referrer: referral.referrer
      ? {
        id: referral.referrer.id,
        name: referral.referrer.name,
        email: referral.referrer.email.toString?.() ?? referral.referrer.email,
      }
      : null,
  }));
}

export async function addReferral(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const referrerId = formData.get("referrerId") as string | null;

  let referrer: User | undefined = undefined;

  if (referrerId) {
    // You could fetch the real user from repo, but if only ID is known:
    referrer = new User(referrerId, "", "");
  }

  const referral = Referral.builder()
    .withId("") // let DB generate ID
    .withName(name)
    .withEmail(new Email(email))
    .withDate(new Date())
    .withStatus(ReferralStatus.Pending)
    .withReferrer(referrer as User)
    .build();

  await addReferralUseCase.execute(referral);
  revalidatePath("/dashboard/referrals");
}

export async function editReferral(referralData: Partial<Referral> & { id: string }) {
  const { id, ...data } = referralData;
  await editReferralUseCase.execute(id, data);
  revalidatePath("/dashboard/referrals");
}

export async function deleteReferral(id: string) {
  await deleteReferralUseCase.execute(id);
  revalidatePath("/dashboard/referrals");
}
