import { IReferralRepository } from "@/domain/repositories/IReferralRepository";
import { Referral } from "@/domain/entities/Referral";
import { Email } from "@/domain/value-objects/Email";

export class AddReferralUseCase {
    constructor(private repo: IReferralRepository) { }
    async execute(input: { name: string; email: string }) {
        const referral = new Referral(crypto.randomUUID(), input.name, new Email(input.email), new Date());
        await this.repo.save(referral);
        return referral;
    }
}