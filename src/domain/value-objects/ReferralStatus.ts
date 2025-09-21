export const ReferralStatus = {
  Pending: "Pending",
  Converted: "Converted",
} as const

export type ReferralStatusType = typeof ReferralStatus[keyof typeof ReferralStatus];
