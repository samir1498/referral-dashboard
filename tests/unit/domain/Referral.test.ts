import { describe, it, expect } from 'vitest';
import { Referral } from '@/domain/entities/Referral';
import { Email } from '@/domain/value-objects/Email';
import { ReferralStatus } from '@/domain/value-objects/ReferralStatus';

describe('Referral Entity', () => {
  it('should be able to be created', () => {
    const referral = new Referral(
      '123',
      'John Doe',
      new Email('john.doe@example.com'),
      new Date(),
      ReferralStatus.Pending
    );

    expect(referral).toBeInstanceOf(Referral);
    expect(referral.status).toBe(ReferralStatus.Pending);
  });

  it('should be able to convert its status', () => {
    const referral = new Referral(
      '123',
      'Jane Doe',
      new Email('jane.doe@example.com'),
      new Date(),
      ReferralStatus.Pending
    );

    referral.convert();

    expect(referral.status).toBe(ReferralStatus.Converted);
  });
});
