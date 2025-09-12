# Feature: Testing Strategy

This document outlines the testing strategy for the Referral Dashboard.

## ✅ Testing Strategy

- **Domain tests** (unit, no infra): test `Referral`, `Email`, `ReferralService`.
- **Application tests**: mock repositories, test `AddReferralUseCase`, etc.
- **Infrastructure tests**: integration tests with Drizzle against a test DB (Docker Postgres).
- **E2E tests**: Playwright → test API + UI flows.
