"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    if (password.length < 4) {
      setErrorMessage("รหัสผ่านต้องมีความยาวอย่างน้อย 4 ตัวอักษร");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "สมัครสมาชิกไม่สำเร็จ");
        setLoading(false);
        return;
      }

      setSuccessMessage(data.message || "สมัครสมาชิกและเข้าสู่ระบบสำเร็จ!");
      // Notify other components like Navbar
      window.dispatchEvent(new Event("auth-changed"));

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold text-white tracking-tight">สมัครสมาชิกใหม่ (Register)</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          สร้างบัญชีผู้ใช้งานใหม่ลงฐานข้อมูล SQLite (Route: <code className="text-indigo-400 font-mono">/register</code>)
        </p>
      </div>

      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs sm:text-sm flex items-start gap-2.5">
          <span className="text-base leading-none">⚠️</span>
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs sm:text-sm flex items-start gap-2.5">
          <span className="text-base leading-none">🎉</span>
          <span>{successMessage} กำลังนำทางไปหน้าหลัก...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            ชื่อผู้ใช้งาน (Username)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none text-sm">
              👤
            </span>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="เช่น john_doe"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            อีเมล (Email Address)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none text-sm">
              ✉️
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              รหัสผ่าน (Password)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none text-sm">
                🔑
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="อย่างน้อย 4 ตัวอักษร"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              ยืนยันรหัสผ่าน (Confirm)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none text-sm">
                🔒
              </span>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="กรอกรหัสผ่านซ้ำอีกครั้ง"
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium text-sm shadow-lg shadow-purple-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>กำลังบันทึกข้อมูลสมาชิก...</span>
            </>
          ) : (
            <>
              <span>ยืนยันสมัครสมาชิก</span>
              <span>→</span>
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
        มีบัญชีผู้ใช้งานอยู่แล้ว?{" "}
        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold underline ml-1">
          เข้าสู่ระบบที่นี่
        </Link>
      </div>
    </div>
  );
}
