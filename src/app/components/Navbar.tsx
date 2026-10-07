"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: string;
}

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAuthUser = async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      setUser(data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthUser();

    const handleAuthChange = () => {
      fetchAuthUser();
    };

    window.addEventListener("auth-changed", handleAuthChange);
    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      window.dispatchEvent(new Event("auth-changed"));
      router.push("/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 sm:px-6 py-3.5">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo / Brand Title & Version */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:opacity-90 transition"
          >
            NextJS Test App
          </Link>
          <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            v1.6.0
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
          <Link href="/" className="text-slate-300 hover:text-white transition">
            Home
          </Link>
          <Link href="/pokemon_list" className="text-emerald-400 hover:text-emerald-300 font-semibold transition flex items-center gap-1">
            <span>⚡</span> Pokemon
          </Link>
          <Link href="/products" className="text-slate-300 hover:text-white transition">
            Products
          </Link>
          <Link href="/posts" className="text-slate-300 hover:text-white transition">
            Posts
          </Link>
          <Link href="/counter" className="text-slate-300 hover:text-white transition">
            Counter
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-white transition">
            About
          </Link>
          <Link href="/contact" className="text-slate-300 hover:text-white transition">
            Contact
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm">
          {!loading && user ? (
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-semibold text-slate-200">
                👤 {user.username}
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                {user.role}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="ml-1.5 text-xs text-rose-400 hover:text-rose-300 underline font-medium transition"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : !loading ? (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition font-medium"
              >
                เข้าสู่ระบบ
              </Link>
              <Link
                href="/register"
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-md shadow-indigo-500/20 transition"
              >
                สมัครสมาชิก
              </Link>
            </div>
          ) : (
            <div className="w-20 h-7 bg-slate-800/50 rounded-lg animate-pulse" />
          )}
        </div>
      </div>
    </header>
  );
}
