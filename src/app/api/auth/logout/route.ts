import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "ออกจากระบบเรียบร้อยแล้ว",
  });

  // Delete cookie
  response.cookies.set("auth_user", "", {
    httpOnly: false,
    path: "/",
    expires: new Date(0),
    sameSite: "lax",
  });

  return response;
}
