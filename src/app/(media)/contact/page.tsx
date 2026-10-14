"use client";

import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full flex flex-col items-center justify-center space-y-12">
        {/* Contact Profile Header */}
        <section className="text-center space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide uppercase">
            💻 IT Support & System Admin
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
            ติดต่อสอบถาม
          </h1>
          <p className="text-slate-400 text-base md:text-lg">
            ศูนย์บริการและสนับสนุนระบบคอมพิวเตอร์ โรงเรียนสวีวิทยา
          </p>
        </section>

        {/* Profile Card */}
        <section className="w-full max-w-2xl p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-800/80">
            {/* Avatar Badge */}
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-indigo-500/25 flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-4xl">
                👨‍💻
              </div>
            </div>
            
            <div className="text-center sm:text-left space-y-1">
              <h2 className="text-2xl font-bold text-white">ปอปลา (Por Pla)</h2>
              <p className="text-indigo-400 font-medium">เจ้าหน้าที่ระบบคอมพิวเตอร์</p>
              <p className="text-slate-400 text-sm flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                <span>🏫</span> โรงเรียนสวีวิทยา (Sawee Witthaya School)
              </p>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">ขอบเขตงานดูแล</span>
              <p className="text-slate-200 font-medium text-sm">ดูแลระบบเครือข่าย, เครื่องคอมพิวเตอร์ และระบบสารสนเทศในโรงเรียน</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800/60 space-y-1">
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">สังกัดหน่วยงาน</span>
              <p className="text-slate-200 font-medium text-sm">กลุ่มงานบริหารทั่วไป / งานเทคโนโลยีสารสนเทศ</p>
            </div>
          </div>

          {/* Contact Form Placeholder */}
          <div className="pt-2 space-y-4">
            <h3 className="text-lg font-semibold text-white">ส่งข้อความแจ้งเรื่อง / สอบถามระบบ</h3>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  type="text"
                  placeholder="ชื่อ-นามสกุล ของท่าน"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition text-sm"
                />
              </div>
              <div>
                <textarea
                  rows={3}
                  placeholder="รายละเอียดเรื่องที่ต้องการแจ้งระบบคอมพิวเตอร์..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all text-sm"
              >
                ส่งข้อความติดต่อ 🚀
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 px-6 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} NextJS Test App — โรงเรียนสวีวิทยา
      </footer>
    </div>
  );
}
