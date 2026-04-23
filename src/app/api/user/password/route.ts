import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { findUserByEmail, updateUser } from "@/lib/users";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { currentPassword, newPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const user = await findUserByEmail(session.user.email);

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: "User not found or invalid account type" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isValid) {
      return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    await updateUser(user.id, { passwordHash: newPasswordHash });

    return NextResponse.json({ success: true, message: "Password updated successfully" });

  } catch (error: any) {
    console.error("Password update error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
