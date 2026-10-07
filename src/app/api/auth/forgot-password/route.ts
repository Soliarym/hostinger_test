import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, newPassword } = body;

    if (!identifier || !newPassword) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อผู้ใช้/อีเมล และรหัสผ่านใหม่" },
        { status: 400 }
      );
    }

    const cleanIdentifier = String(identifier).trim();
    const cleanPassword = String(newPassword).trim();

    if (cleanPassword.length < 4) {
      return NextResponse.json(
        { error: "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 4 ตัวอักษร" },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: cleanIdentifier },
          { email: cleanIdentifier },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: `ไม่พบบัญชีผู้ใช้ "${cleanIdentifier}" ในระบบ` },
        { status: 404 }
      );
    }

    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { password: cleanPassword },
    });

    return NextResponse.json({
      success: true,
      message: `รีเซ็ตรหัสผ่านสำหรับบัญชี ${user.username} เรียบร้อยแล้ว! สามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้ทันที`,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการรีเซ็ตรหัสผ่าน กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
