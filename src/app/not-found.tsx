import Link from "next/link";

export const metadata = {
  title: "404 - ไม่พบหน้านี้ | NextJS App",
  description: "หน้าที่คุณต้องการไม่พบในระบบ แนะนำให้เลือกเมนูผ่าน Navbar ด้านบน",
};

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Animated Direction Indicator to Navbar */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold animate-bounce shadow-lg shadow-indigo-500/10">
          <span className="text-base">⬆️</span>
          <span>ใส่ link ผิด? แนะนำให้กดเลือกเมนูจากแถบ Navbar ด้านบน ชัวร์สุดครับ!</span>
        </div>

        {/* Big 404 Glitch / Gradient Number */}
        <div className="relative mb-2">
          <span className="text-8xl sm:text-9xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-2xl select-none">
            404
          </span>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full" />
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          ไม่พบหน้าที่คุณกำลังค้นหา (Page Not Found)
        </h1>

        {/* Subtitle / Explanation */}
        <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-lg">
          หน้าที่คุณพยายามเปิดอาจถูกลบ ย้ายที่อยู่ หรือคุณอาจจะพิมพ์ URL ใน Address bar ผิดพลาด 
          ไม่ต้องตกใจครับ ลองเลือกเมนูที่มีอยู่จริงจากแถบนำทาง หรือกดปุ่มด้านล่างนี้ได้เลย
        </p>

        {/* Recommendation Box */}
        <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 mb-8 shadow-xl backdrop-blur-md text-left">
          <div className="flex items-center gap-2.5 text-amber-400 font-semibold text-sm mb-2">
            <span>💡</span>
            <span>เคล็ดลับการใช้งาน:</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            แทนที่จะพิมพ์ URL เองโดยตรง ให้คลิกที่แถบ <strong className="text-white">Navigation Bar</strong> ด้านบนสุดของหน้าเว็บ 
            ซึ่งมีลิงก์ไปยังทุกหมวดหมู่อย่างครบถ้วนและถูกต้องแน่นอนครับ
          </p>
        </div>

        {/* Quick Access Grid Links */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <Link
            href="/"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-indigo-500/50 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🏠</span>
            <span className="text-xs font-semibold text-slate-200">หน้าแรก</span>
            <span className="text-[10px] text-slate-400 font-mono">Home</span>
          </Link>

          <Link
            href="/pokemon_list"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">⚡</span>
            <span className="text-xs font-semibold text-emerald-400">Pokemon</span>
            <span className="text-[10px] text-slate-400 font-mono">10 ธาตุ 100 ตัว</span>
          </Link>

          <Link
            href="/products"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/50 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">🛍️</span>
            <span className="text-xs font-semibold text-slate-200">สินค้า</span>
            <span className="text-[10px] text-slate-400 font-mono">Products</span>
          </Link>

          <Link
            href="/posts"
            className="flex flex-col items-center justify-center p-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-purple-500/50 transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">📝</span>
            <span className="text-xs font-semibold text-slate-200">บทความ</span>
            <span className="text-[10px] text-slate-400 font-mono">Posts</span>
          </Link>
        </div>

        {/* Primary Action Button */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-150 hover:scale-105"
          >
            <span>🔙</span>
            <span>กลับสู่หน้าหลักที่ปลอดภัย</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
