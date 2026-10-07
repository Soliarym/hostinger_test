import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, password } = body;

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อผู้ใช้หรืออีเมล และรหัสผ่าน" },
        { status: 400 }
      );
    }

    const cleanIdentifier = String(identifier).trim();
    const cleanPassword = String(password).trim();

    // Find user by username or email
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: cleanIdentifier },
          { email: cleanIdentifier },
        ],
      },
    });

    if (!user || user.password !== cleanPassword) {
      return NextResponse.json(
        { error: "ชื่อผู้ใช้/อีเมล หรือรหัสผ่านไม่ถูกต้อง (ทดสอบ Default Admin: admin / admin)" },
        { status: 401 }
      );
    }

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    const response = NextResponse.json({
      success: true,
      message: `ยินดีต้อนรับ ${user.username}! เข้าสู่ระบบสำเร็จ`,
      user: userData,
    });

    // Set auth cookie
    response.cookies.set("auth_user", JSON.stringify(userData), {
      httpOnly: false, // allow client-side sync easily
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดภายในระบบ กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
