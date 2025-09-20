import { Email } from "../value-objects/Email";
import { ReferralStatus } from "../value-objects/ReferralStatus";
import { User } from "./User";

export class Referral {
  constructor(
    public id: string,
    public name: string,
    public email: Email,
    public date: Date,
    public status: ReferralStatus = ReferralStatus.Pending,
    public referrer?: User
  ) {}
  convert() {
    this.status = ReferralStatus.Converted;
  }
}