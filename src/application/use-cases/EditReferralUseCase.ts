import { Referral } from "@/domain/entities/Referral";
import { IReferralRepository } from "@/domain/repositories/IReferralRepository";

export class EditReferralUseCase {
  constructor(private referralRepository: IReferralRepository) {}

  async execute(id: string, data: Partial<Referral>): Promise<Referral | null> {
    return this.referralRepository.update(id, data);
  }
}
