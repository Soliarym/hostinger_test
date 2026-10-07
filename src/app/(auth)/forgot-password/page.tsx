"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword !== confirmPassword) {
      setErrorMessage("รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน");
      return;
    }

    if (newPassword.length < 4) {
      setErrorMessage("รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 4 ตัวอักษร");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "รีเซ็ตรหัสผ่านไม่สำเร็จ");
        setLoading(false);
        return;
      }

      setSuccessMessage(data.message || "รีเซ็ตรหัสผ่านสำเร็จ!");

      setTimeout(() => {
        router.push("/login");
      }, 1800);
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
        <h2 className="text-2xl font-bold text-white tracking-tight">ลืมรหัสผ่าน (Reset Password)</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          ค้นหาบัญชีและตั้งรหัสผ่านใหม่ (Route: <code className="text-indigo-400 font-mono">/forgot-password</code>)
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
          <span className="text-base leading-none">✅</span>
          <span>{successMessage} กำลังนำทางไปหน้าเข้าสู่ระบบ...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            ชื่อผู้ใช้ หรือ อีเมลของบัญชีที่ต้องการรีเซ็ต
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none text-sm">
              🔍
            </span>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="เช่น admin หรือ admin@example.com"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            รหัสผ่านใหม่ (New Password)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none text-sm">
              🔑
            </span>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="กรอกรหัสผ่านใหม่ (อย่างน้อย 4 ตัวอักษร)"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            ยืนยันรหัสผ่านใหม่ (Confirm New Password)
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
              placeholder="กรอกรหัสผ่านใหม่อีกครั้ง"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 hover:from-amber-500 hover:to-rose-500 text-white font-medium text-sm shadow-lg shadow-orange-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>กำลังตรวจสอบและบันทึก...</span>
            </>
          ) : (
            <>
              <span>ตั้งรหัสผ่านใหม่</span>
              <span>→</span>
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <Link href="/login" className="text-indigo-400 hover:text-indigo-300 underline font-medium">
          ← กลับไปหน้าเข้าสู่ระบบ
        </Link>
        <Link href="/register" className="text-indigo-400 hover:text-indigo-300 underline font-medium">
          สมัครสมาชิกใหม่
        </Link>
      </div>
    </div>
  );
}
