import { IReferralRepository } from "@/domain/repositories/IReferralRepository";

export class ListReferralsUseCase {
  constructor(private repo: IReferralRepository) {}
  async execute() {
    return this.repo.findAll();
  }
}