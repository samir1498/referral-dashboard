import { IReferralRepository } from "@/domain/repositories/IReferralRepository";

export class DeleteReferralUseCase {
  constructor(private referralRepository: IReferralRepository) {}

  async execute(id: string): Promise<void> {
    await this.referralRepository.delete(id);
  }
}
