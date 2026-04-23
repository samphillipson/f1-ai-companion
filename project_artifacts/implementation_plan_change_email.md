# Change Email Feature

This plan outlines the steps to allow a user to change their email address from the account page.

## Proposed Changes

### 1. New API Route
#### [NEW] [src/app/api/user/email/route.ts](file:///c:/Users/samph/.gemini/antigravity/scratch/f1-ai-app/src/app/api/user/email/route.ts)
Create a new API route that:
- Validates the user's session.
- Checks if the requested `newEmail` is already taken by another account.
- Generates a new `verificationToken`.
- Updates the user's record in PostgreSQL with the new email, the new verification token, and sets `isVerified = false`.
- Triggers `sendVerificationEmail` to the new email address.

### 2. UI Updates
#### [MODIFY] [src/app/account/AccountClient.tsx](file:///c:/Users/samph/.gemini/antigravity/scratch/f1-ai-app/src/app/account/AccountClient.tsx)
- Add a new "Change Email" section similar to the "Change Password" section.
- Allow the user to input a new email address.
- When successfully submitted, since the user's session is now tied to a stale email and they must verify their new email before logging in again, the app will automatically sign them out and redirect them to the login page with a message instructing them to check their new inbox.

## Open Questions

> [!IMPORTANT]
> **Session Handling & Verification:** When a user changes their email, they will be required to verify the new email address before they can log in again. To ensure security, I plan to **automatically sign the user out** immediately after they successfully change their email, forcing them to re-verify and log back in. Are you okay with this flow?

## Verification Plan
1. Create a dummy user and log in.
2. Navigate to the Account page and update the email to a different address.
3. Verify that the user is signed out.
4. Check the development terminal to ensure the Resend verification email was triggered.
5. Verify the new email using the verification link.
6. Log back in with the new email.
