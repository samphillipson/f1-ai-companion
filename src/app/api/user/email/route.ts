import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { findUserByEmail, updateUser } from "@/lib/users";
import { sendVerificationEmail } from "@/lib/mailer";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { newEmail, password } = body;

    if (!newEmail || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await findUserByEmail(session.user.email);

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "User not found or invalid account type" }, { status: 404 });
    }

    // Verify current password for security before changing email
    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 400 });
    }

    // Check if new email is already in use
    const existingUser = await findUserByEmail(newEmail);
    if (existingUser) {
      return NextResponse.json({ error: "Email is already in use by another account" }, { status: 400 });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    await updateUser(user.id, { 
      email: newEmail.toLowerCase(),
      isVerified: false,
      verificationToken: verificationToken
    });

    await sendVerificationEmail(newEmail.toLowerCase(), verificationToken);

    return NextResponse.json({ success: true, message: "Email updated successfully. Please verify your new email." });

  } catch (error: any) {
    console.error("Email update error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
