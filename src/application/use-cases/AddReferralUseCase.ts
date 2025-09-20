import { IReferralRepository } from "@/domain/repositories/IReferralRepository";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { Referral } from "@/domain/entities/Referral";
import { Email } from "@/domain/value-objects/Email";
import { ReferralStatus } from "@/domain/value-objects/ReferralStatus";

export class AddReferralUseCase {
  constructor(
    private referralRepo: IReferralRepository,
    private userRepo: IUserRepository
  ) { }

  async execute(input: Referral) {
    const referrerId = input?.referrer?.id as string;
    const referrer = await this.userRepo.findById(referrerId);
    if (!referrer) {
      throw new Error("Referrer not found");
    }

    const referral = Referral.builder()
      .withId(crypto.randomUUID())
      .withName(input.name)
      .withEmail(new Email(input.email.toString()))
      .withDate(new Date())
      .withStatus(ReferralStatus.Pending)
      .withReferrer(referrer)
      .build();

    await this.referralRepo.save(referral);
    return referral;
  }
}
