import { Referral } from "../entities/Referral";

export interface IReferralRepository {
  save(referral: Referral): Promise<void>;
  findAll(): Promise<Referral[]>;
  findById(id: string): Promise<Referral | null>;
}