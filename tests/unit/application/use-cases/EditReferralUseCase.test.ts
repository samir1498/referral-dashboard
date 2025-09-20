import { describe, it, expect, beforeEach } from "vitest";
import { EditReferralUseCase } from "@/application/use-cases/EditReferralUseCase";
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

describe("EditReferralUseCase", () => {
  let referralRepository: IReferralRepository;
  let editReferralUseCase: EditReferralUseCase;

  beforeEach(() => {
    referralRepository = new StubReferralRepository();
    editReferralUseCase = new EditReferralUseCase(referralRepository);
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

  it("should edit an existing referral", async () => {
    const updatedName = "Jane Doe";
    const updatedEmail = new Email("jane.doe@example.com");
    const updatedStatus = ReferralStatus.Converted;

    const updatedReferral = await editReferralUseCase.execute("1", {
      name: updatedName,
      email: updatedEmail,
      status: updatedStatus,
    });

    expect(updatedReferral).not.toBeNull();
    expect(updatedReferral?.id).toBe("1");
    expect(updatedReferral?.name).toBe(updatedName);
    expect(updatedReferral?.email.toString()).toBe(updatedEmail.toString());
    expect(updatedReferral?.status).toBe(updatedStatus);
  });

  it("should return null if referral not found", async () => {
    const updatedReferral = await editReferralUseCase.execute("999", {
      name: "Non Existent",
    });
    expect(updatedReferral).toBeNull();
  });
});
