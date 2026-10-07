"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/login",
      label: "เข้าสู่ระบบ",
      icon: "🔑",
      desc: "Sign In",
    },
    {
      href: "/register",
      label: "สมัครสมาชิก",
      icon: "📝",
      desc: "Register",
    },
    {
      href: "/forgot-password",
      label: "ลืมรหัสผ่าน",
      icon: "🔒",
      desc: "Forgot Password",
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-[calc(100vh-73px)]">
      <div className="w-full max-w-lg space-y-6">
        {/* Route Group Education Banner */}
        <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-2xl p-4 shadow-lg backdrop-blur-sm">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold">
                🗂️ Route Group Demo
              </span>
              <code className="text-xs font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">
                src/app/(auth)/
              </code>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
              URL Omitted
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            โฟลเดอร์ <code className="text-indigo-300 font-mono font-semibold">(auth)</code> เป็น <strong>Route Group</strong> ใน Next.js App Router 
            ช่วยจัดกลุ่มหน้า Authentication และใช้ <em>Shared Layout</em> ร่วมกัน โดยชื่อ <code className="text-pink-300 font-mono">(auth)</code> จะ <u>ไม่ถูกนำไปใส่ใน URL</u>
          </p>
          <div className="mt-2.5 pt-2 border-t border-indigo-500/20 flex items-center justify-between text-[11px] text-slate-400">
            <span>Path: <code className="text-amber-300 font-mono">/login</code>, <code className="text-amber-300 font-mono">/register</code>, <code className="text-amber-300 font-mono">/forgot-password</code></span>
            <Link href="/" className="text-indigo-400 hover:text-indigo-300 underline font-medium">
              ← กลับหน้าหลัก
            </Link>
          </div>
        </div>

        {/* Main Card with Tabs */}
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md">
          {/* Tabs Navigation */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800/80 mb-8">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/forgot-password" && pathname === "/forgotpassword");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <span className="text-base sm:text-lg mb-0.5">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Child Page Form */}
          {children}
        </div>

        {/* Default Admin Info Card */}
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-2xl p-4 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">👤</span>
            <div>
              <span className="text-slate-300 font-medium">บัญชีทดสอบระบบ (Default Admin):</span>
              <div className="text-slate-400 font-mono text-[11px] mt-0.5">
                Username: <span className="text-emerald-400 font-semibold">admin</span> | Password: <span className="text-emerald-400 font-semibold">admin</span>
              </div>
            </div>
          </div>
          <span className="text-[11px] px-2 py-0.5 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full font-mono">
            Role: Administrator
          </span>
        </div>
      </div>
    </div>
  );
}
