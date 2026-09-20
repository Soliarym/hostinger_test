"use client";

import { useState } from "react";

export default function ErrorTrigger() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    throw new Error("ข้อผิดพลาดจำลอง: คุณได้กดปุ่มทำให้เกิด Error จากหน้าเพจสำเร็จแล้ว!");
  }

  return (
    <div className="w-full p-4 rounded-2xl bg-slate-900/90 border-2 border-dashed border-rose-500/40 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-rose-950/20">
      <div className="text-left space-y-1">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <span>🧪 แผงทดสอบ Error & Reset</span>
          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-[10px] text-rose-300">
            Interactive
          </span>
        </div>
        <p className="text-slate-400 text-xs">
          กดปุ่มสีแดงด้านข้างเพื่อจำลอง Error ทันที แล้วในหน้า Error จะมีปุ่ม Reset ให้กดกลับมาหน้าเดิม
        </p>
      </div>

      <button
        type="button"
        onClick={() => setHasError(true)}
        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-600/30 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
      >
        <span>💥 กดเพื่อจำลอง Error</span>
      </button>
    </div>
  );
}
