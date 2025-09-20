import { Referral } from "../entities/Referral";

export interface IReferralRepository {
  save(referral: Referral): Promise<void>;
  findAll(): Promise<Referral[]>;
  findById(id: string): Promise<Referral | null>;
  update(id: string, referral: Partial<Referral>): Promise<Referral | null>;
  delete(id: string): Promise<void>;
}