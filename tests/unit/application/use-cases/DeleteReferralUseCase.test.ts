import { describe, it, expect, beforeEach } from "vitest";
import { DeleteReferralUseCase } from "@/application/use-cases/DeleteReferralUseCase";
import { IReferralRepository } from "@/domain/repositories/IReferralRepository";
import { Referral } from "@/domain/entities/Referral";
import { Email } from "@/domain/value-objects/Email";
import { ReferralStatus } from "@/domain/value-objects/ReferralStatus";

class StubReferralRepository implements IReferralRepository {
  private referrals: Referral[] = [];

  async save(referral: Referral): Promise<void> {
    this.referrals.push(referral);
  }

  async findAll(): Promise<Referral[]> {
    return this.referrals;
  }

  async findById(id: string): Promise<Referral | null> {
    return this.referrals.find((r) => r.id === id) || null;
  }

  async update(id: string, data: Partial<Referral>): Promise<Referral | null> {
    const index = this.referrals.findIndex((r) => r.id === id);
    if (index === -1) {
      return null;
    }
    const updatedReferral = new Referral(
      this.referrals[index].id,
      data.name || this.referrals[index].name,
      data.email || this.referrals[index].email,
      data.date || this.referrals[index].date,
      data.status || this.referrals[index].status,
      data.referrer || this.referrals[index].referrer
    );
    this.referrals[index] = updatedReferral;
    return updatedReferral;
  }

  async delete(id: string): Promise<void> {
    this.referrals = this.referrals.filter((r) => r.id !== id);
  }
}

describe("DeleteReferralUseCase", () => {
  let referralRepository: IReferralRepository;
  let deleteReferralUseCase: DeleteReferralUseCase;

  beforeEach(() => {
    referralRepository = new StubReferralRepository();
    deleteReferralUseCase = new DeleteReferralUseCase(referralRepository);
    // Seed some data
    referralRepository.save(
      new Referral(
        "1",
        "John Doe",
        new Email("john.doe@example.com"),
        new Date(),
        ReferralStatus.Pending
      )
    );
  });

  it("should delete an existing referral", async () => {
    await deleteReferralUseCase.execute("1");
    const deletedReferral = await referralRepository.findById("1");
    expect(deletedReferral).toBeNull();
  });

  it("should not throw error if referral not found", async () => {
    await expect(deleteReferralUseCase.execute("999")).resolves.not.toThrow();
  });
});
