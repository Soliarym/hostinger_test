import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-20 w-full flex flex-col items-center justify-center text-center">
        <div className="p-8 md:p-12 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-6 max-w-xl w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
            🧪 Test Environment
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            เกี่ยวกับเรา (About)
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 font-medium leading-relaxed">
            ทดสอบการสร้างเว็บเฉยๆ ไม่มีอะไรมาก 🚀
          </p>

          <p className="text-sm text-slate-400">
            โปรเจกต์นี้สร้างขึ้นสำหรับทดลองระบบ Next.js 16 (App Router) + Tailwind CSS
          </p>

          {/* Tech Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 font-mono">Next.js 16</span>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 font-mono">Tailwind CSS</span>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300 font-mono">TypeScript</span>
          </div>

          <div className="pt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              ← กลับหน้าหลัก (Home)
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} NextJS Test App
      </footer>
    </div>
  );
}
