import { IReferralRepository } from "@/domain/repositories/IReferralRepository";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import { Referral } from "@/domain/entities/Referral";
import { Email } from "@/domain/value-objects/Email";

export class AddReferralUseCase {
  constructor(
    private referralRepo: IReferralRepository,
    private userRepo: IUserRepository
  ) {}
  async execute(input: { name: string; email: string; referrerId: string }) {
    const referrer = await this.userRepo.findById(input.referrerId);
    if (!referrer) {
      throw new Error("Referrer not found");
    }
    const referral = new Referral(
      crypto.randomUUID(),
      input.name,
      new Email(input.email),
      new Date(),
      undefined,
      referrer
    );
    await this.referralRepo.save(referral);
    return referral;
  }
}
