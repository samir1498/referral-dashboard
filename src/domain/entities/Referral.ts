import { Email } from "../value-objects/Email";
import { ReferralStatus } from "../value-objects/ReferralStatus";
import { User } from "./User";

export class Referral {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: Email,
    public readonly date: Date,
    public status: ReferralStatus = ReferralStatus.Pending,
    public readonly referrer?: User
  ) {}

  convert() {
    this.status = ReferralStatus.Converted;
  }

  static builder() {
    return new ReferralBuilder();
  }
}

class ReferralBuilder {
  private id!: string;
  private name!: string;
  private email!: Email;
  private date!: Date;
  private status: ReferralStatus = ReferralStatus.Pending;
  private referrer?: User;

  withId(id: string): this {
    this.id = id;
    return this;
  }

  withName(name: string): this {
    this.name = name;
    return this;
  }

  withEmail(email: Email): this {
    this.email = email;
    return this;
  }

  withDate(date: Date): this {
    this.date = date;
    return this;
  }

  withStatus(status: ReferralStatus): this {
    this.status = status;
    return this;
  }

  withReferrer(referrer: User): this {
    this.referrer = referrer;
    return this;
  }

  build(): Referral {
    return new Referral(
      this.id,
      this.name,
      this.email,
      this.date,
      this.status,
      this.referrer
    );
  }
}
