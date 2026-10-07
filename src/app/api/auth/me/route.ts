import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const authCookie = req.cookies.get("auth_user");
    if (!authCookie || !authCookie.value) {
      return NextResponse.json({ user: null });
    }

    try {
      const parsed = JSON.parse(authCookie.value);
      if (!parsed || !parsed.username) {
        return NextResponse.json({ user: null });
      }

      // Check DB to ensure user still exists
      const user = await prisma.user.findUnique({
        where: { id: parsed.id },
      });

      if (!user) {
        return NextResponse.json({ user: null });
      }

      return NextResponse.json({
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });
    } catch {
      return NextResponse.json({ user: null });
    }
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json({ user: null });
  }
}
