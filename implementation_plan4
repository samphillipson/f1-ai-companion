# Forgot Password (and Username) Implementation Plan

We will build out the complete flow for users to reset their passwords via email verification.

## User Review Required

> [!IMPORTANT]
> Please review the proposed changes below. Note the open question regarding the "forgotten username" functionality. Once you approve, I will begin implementing the changes.

## Open Questions

> [!WARNING]
> You mentioned "forgotten my username". Currently, the application uses **Email Addresses** as the sole login identifier (we don't have a separate "username" field in the database). 
> 
> **Question:** Do you want to continue using just Email for login (meaning we only need to build "Forgot Password"), OR do you want to add a distinct "Username" field to the database that users can recover if forgotten? 
> *(The plan below assumes we stick with Email for now, but we can easily add Usernames if you prefer!)*

## Proposed Changes

### 1. Database Updates
#### [MODIFY] `prisma/schema.prisma`
- Add `resetPasswordToken String? @unique` to the `User` model.
- Add `resetPasswordExpires DateTime?` to the `User` model.
- *Note: After modifying this, we will need to run `npx dotenv-cli -e .env.local -- npx prisma db push` to update your Supabase database.*

### 2. Email Integration
#### [MODIFY] `src/lib/mailer.ts`
- Add a new `sendPasswordResetEmail(email: string, token: string)` function using the Resend API.

### 3. Forgot Password Flow
#### [NEW] `src/app/forgot-password/page.tsx`
- A sleek client component UI where users can enter their email address to request a reset link.
#### [NEW] `src/app/api/auth/forgot-password/route.ts`
- API endpoint that verifies the email exists, generates a secure random token, saves it (and its expiration time) to the database via Prisma, and sends the reset email.

### 4. Reset Password Flow
#### [NEW] `src/app/reset-password/page.tsx`
- A client UI that reads the `?token=` parameter from the URL. It will contain a form for the user to type in their new password.
#### [NEW] `src/app/api/auth/reset-password/route.ts`
- API endpoint that validates the token against the database (ensuring it exists and hasn't expired), hashes the new password with `bcrypt`, updates the user record, and clears the reset token.

### 5. UI Navigation Updates
#### [MODIFY] `src/app/login/page.tsx`
- Add a "Forgot Password?" link below the password input field that navigates to `/forgot-password`.

---

## Verification Plan

### Manual Verification
1. Click the "Forgot Password?" link on the login page.
2. Enter your registered email address and submit.
3. Check your email inbox for the Resend email.
4. Click the link in the email, which will take you to `/reset-password?token=...`.
5. Enter a new password.
6. Try to log in with the new password.
