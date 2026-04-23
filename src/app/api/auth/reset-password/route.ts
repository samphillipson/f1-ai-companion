import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { resetPasswordToken: token },
    });

    if (!user || !user.resetPasswordExpires) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
    }

    if (new Date() > user.resetPasswordExpires) {
      return NextResponse.json({ error: "Reset token has expired" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return NextResponse.json({ success: true, message: "Password has been reset" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
