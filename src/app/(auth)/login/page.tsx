"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAutofillAdmin = () => {
    setIdentifier("admin");
    setPassword("admin");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "เข้าสู่ระบบไม่สำเร็จ");
        setLoading(false);
        return;
      }

      setSuccessMessage(data.message || "เข้าสู่ระบบสำเร็จ!");
      // Notify other components like Navbar
      window.dispatchEvent(new Event("auth-changed"));

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1200);
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
        <h2 className="text-2xl font-bold text-white tracking-tight">เข้าสู่ระบบ (Sign In)</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          กรอกชื่อผู้ใช้หรืออีเมลเพื่อเข้าสู่ระบบงาน (Route: <code className="text-indigo-400 font-mono">/login</code>)
        </p>
      </div>

      {/* Quick Fill Admin Button */}
      <div className="bg-slate-950/70 border border-indigo-500/30 rounded-xl p-3 flex items-center justify-between gap-3">
        <div className="text-xs">
          <span className="text-indigo-300 font-medium block">⚡ ทดสอบด่วนด้วย Default Admin</span>
          <span className="text-slate-400 text-[11px] font-mono">username: admin / password: admin</span>
        </div>
        <button
          type="button"
          onClick={handleAutofillAdmin}
          className="px-3 py-1.5 bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 rounded-lg text-xs font-semibold transition"
        >
          ใส่ข้อมูล Admin
        </button>
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
          <span>{successMessage} กำลังนำทางไปหน้าหลัก...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            ชื่อผู้ใช้ หรือ อีเมล (Username / Email)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none text-sm">
              👤
            </span>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin หรือ admin@example.com"
              className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-medium text-slate-300">
              รหัสผ่าน (Password)
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none text-sm">
              🔑
            </span>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรอกรหัสผ่าน (admin)"
              className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200 text-xs"
            >
              {showPassword ? "ซ่อน" : "ดู"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>กำลังตรวจสอบข้อมูล...</span>
            </>
          ) : (
            <>
              <span>เข้าสู่ระบบ</span>
              <span>→</span>
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
        ยังไม่มีบัญชีผู้ใช้งาน?{" "}
        <Link href="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold underline ml-1">
          สมัครสมาชิกใหม่ที่นี่
        </Link>
      </div>
    </div>
  );
}
