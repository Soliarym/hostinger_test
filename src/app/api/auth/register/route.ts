import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "กรุณากรอกข้อมูลให้ครบถ้วนทุกช่อง" },
        { status: 400 }
      );
    }

    const cleanUsername = String(username).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPassword = String(password).trim();

    if (cleanUsername.length < 3) {
      return NextResponse.json(
        { error: "ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย 3 ตัวอักษร" },
        { status: 400 }
      );
    }

    if (cleanPassword.length < 4) {
      return NextResponse.json(
        { error: "รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร" },
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { username: cleanUsername },
          { email: cleanEmail },
        ],
      },
    });

    if (existing) {
      if (existing.username.toLowerCase() === cleanUsername.toLowerCase()) {
        return NextResponse.json(
          { error: `ชื่อผู้ใช้ "${cleanUsername}" มีผู้ใช้งานแล้ว กรุณาเลือกชื่ออื่น` },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: `อีเมล "${cleanEmail}" มีในระบบแล้ว` },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username: cleanUsername,
        email: cleanEmail,
        password: cleanPassword,
        role: "user",
      },
    });

    const userData = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    };

    const response = NextResponse.json({
      success: true,
      message: `สมัครสมาชิกสำเร็จ! บัญชี ${newUser.username} พร้อมใช้งานแล้ว`,
      user: userData,
    });

    // Auto login
    response.cookies.set("auth_user", JSON.stringify(userData), {
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
