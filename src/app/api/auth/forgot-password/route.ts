import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/mailer';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      // Return 200 to prevent email enumeration
      return NextResponse.json({ success: true, message: "If an account exists, an email has been sent." });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
      where: { email: user.email },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetTokenExpires,
      },
    });

    await sendPasswordResetEmail(user.email, resetToken);

    return NextResponse.json({ success: true, message: "If an account exists, an email has been sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
