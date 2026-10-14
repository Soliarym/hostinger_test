"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Event: บันทึก error ลง console เมื่อ component ถูก render
    console.error("Posts Error Boundary Triggered:", error);
  }, [error]);

  const handleReset = () => {
    // 1. สั่ง reset() เพื่อเคลียร์สถานะ Error Boundary
    reset();
    // 2. สั่ง refresh หน้าเว็บเพื่อโหลดข้อมูลหน้าเดิมกลับมา
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans items-center justify-center p-6 selection:bg-rose-500 selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-lg w-full p-8 md:p-10 rounded-3xl bg-slate-900/90 border border-rose-500/30 backdrop-blur-xl shadow-2xl text-center space-y-6">
        {/* Warning Icon with Glow */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center text-3xl shadow-lg shadow-rose-500/10">
          ⚠️
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 text-xs font-semibold uppercase tracking-wider">
            เกิดข้อผิดพลาด (Error Boundary)
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">
            เกิดข้อผิดพลาดในการแสดงผล
          </h1>
          <p className="text-slate-400 text-sm">
            ระบบตรวจพบข้อผิดพลาด คุณสามารถกดปุ่มด้านล่างเพื่อ Reset กลับไปยังหน้าเดิมได้ทันที
          </p>
        </div>

        {/* Error Detail Box */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-2 text-xs">
          <div className="text-slate-400 font-medium">ข้อความ Error:</div>
          <p className="text-rose-300 font-mono break-words leading-relaxed font-semibold">
            {error.message || "Unknown error occurred"}
          </p>
          {error.digest && (
            <div className="text-slate-500 font-mono text-[11px] pt-1 border-t border-slate-800">
              Digest: {error.digest}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col gap-3">
          {/* Prominent Reset Button */}
          <button
            type="button"
            onClick={handleReset}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-base shadow-lg shadow-emerald-600/30 transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            🔄 กดปุ่ม Reset เพื่อกลับมาหน้าเดิม
          </button>

          {/* Home Link */}
          <Link
            href="/"
            className="py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs transition-all text-center"
          >
            ← กลับหน้าหลัก (Home)
          </Link>
        </div>
      </div>
    </div>
  );
}
