import Image from "next/image";
import Link from "next/link";
import { formatThaiDate } from "@/app/_lib/format-date";

export default function Home() {
  const currentFormattedDate = formatThaiDate(new Date());

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-between py-12 px-6 sm:px-12 bg-white dark:bg-black sm:items-start gap-10">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left w-full">
          {/* Release Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold">
            <span>🚀 Release</span>
            <span className="font-mono">v1.6.0</span>
            <span className="text-slate-500">•</span>
            <span className="text-emerald-400">Route Groups (auth) & Real Authentication</span>
          </div>

          <h1 className="max-w-xl text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Next.js Route Groups `(auth)` & Fullstack Architecture
          </h1>
          <p className="max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-400">
            โครงสร้างโฟลเดอร์แบบ <code className="text-indigo-400 font-mono">(auth)</code> ช่วยจัดหมวดหมู่เส้นทางและใช้ Shared Layout ร่วมกันโดยไม่กระทบ URL จริง พร้อมระบบ Login, Register และ Forgot Password เชื่อมต่อฐานข้อมูล SQLite จริง
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
            >
              <span>🔑</span>
              <span>ทดลองเข้าสู่ระบบ (Login)</span>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium border border-slate-700 transition-all hover:scale-105"
            >
              <span>📝</span>
              <span>สมัครสมาชิก (Register)</span>
            </Link>
            <Link
              href="/pokemon_list"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 font-medium border border-emerald-500/30 transition-all"
            >
              <span>⚡</span>
              <span>Pokemon Segments</span>
            </Link>
          </div>

          {/* Route Group (auth) Showcase Card */}
          <div className="w-full mt-2 p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-indigo-500/30 text-left text-slate-100 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold">
                  🗂️ Route Group Architecture
                </span>
                <span className="font-mono text-xs text-purple-300">src/app/(auth)/</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono">
                Working In Practice
              </span>
            </div>

            <p className="text-sm text-slate-300 mb-5 leading-relaxed">
              ใน Next.js App Router การตั้งชื่อโฟลเดอร์โดยมีวงเล็บครอบ เช่น <code className="text-indigo-300 font-mono">(auth)</code> เรียกว่า <strong>Route Group</strong> 
              มีประโยชน์ในการจัดกลุ่มโค้ดให้เป็นระเบียบ และสามารถสร้าง <strong>Shared Layout</strong> ประจำกลุ่มได้ โดยไม่เพิ่มคำว่า <code className="text-pink-400 font-mono">/(auth)/</code> ลงใน URL ในเบราว์เซอร์
            </p>

            {/* Path mapping table */}
            <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800/90 mb-5">
              <div className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <span>📍 ตารางเปรียบเทียบ Directory Path vs Browser URL:</span>
              </div>
              <div className="space-y-2.5 font-mono text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-xl bg-slate-900/60 border border-slate-800/50">
                  <span className="text-slate-400">📁 src/app/(auth)/login/page.tsx</span>
                  <span className="text-slate-500 hidden sm:inline">➜</span>
                  <Link href="/login" className="text-emerald-400 hover:text-emerald-300 underline font-semibold">
                    🌐 http://localhost:3000/login
                  </Link>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-xl bg-slate-900/60 border border-slate-800/50">
                  <span className="text-slate-400">📁 src/app/(auth)/register/page.tsx</span>
                  <span className="text-slate-500 hidden sm:inline">➜</span>
                  <Link href="/register" className="text-emerald-400 hover:text-emerald-300 underline font-semibold">
                    🌐 http://localhost:3000/register
                  </Link>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-2 rounded-xl bg-slate-900/60 border border-slate-800/50">
                  <span className="text-slate-400">📁 src/app/(auth)/forgot-password/page.tsx</span>
                  <span className="text-slate-500 hidden sm:inline">➜</span>
                  <Link href="/forgot-password" className="text-emerald-400 hover:text-emerald-300 underline font-semibold">
                    🌐 http://localhost:3000/forgot-password
                  </Link>
                </div>
              </div>
            </div>

            {/* Default credentials card */}
            <div className="bg-indigo-950/30 border border-indigo-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-indigo-300 font-semibold block">
                  👤 บัญชีผู้ใช้เริ่มต้นสำหรับทดสอบ (Default User Seeded):
                </span>
                <span className="text-xs text-slate-300 font-mono mt-0.5 block">
                  Username: <strong className="text-emerald-400">admin</strong> | Password: <strong className="text-emerald-400">admin</strong> (Role: admin)
                </span>
              </div>
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/30 transition"
              >
                เข้าสู่ระบบด้วย Admin →
              </Link>
            </div>
          </div>

          {/* Private Folder Showcase Card */}
          <div className="w-full mt-2 p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 text-left text-slate-100 shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold">
                  📁 Private Folder Demo
                </span>
                <span className="font-mono text-xs text-slate-400">src/app/_lib</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Unroutable</span>
            </div>

            <p className="text-sm text-slate-300 mb-4 leading-relaxed">
              ใน Next.js App Router โฟลเดอร์ที่ขึ้นต้นด้วยเครื่องหมาย <code className="text-amber-300 font-mono">_</code> (เช่น <code className="text-amber-300 font-mono">_lib</code>) 
              จะไม่ถูกมองเป็น URL Route ในเบราว์เซอร์ แต่สามารถ Import ฟังก์ชันและโมดูลมาใช้งานในหน้าอื่นได้ตามปกติ
            </p>

            {/* Live Result from _lib/format-date.ts */}
            <div className="bg-slate-950/80 rounded-xl p-3.5 border border-slate-800/80 mb-4">
              <div className="text-[11px] text-slate-400 font-mono mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                ผลลัพธ์จากฟังก์ชัน formatThaiDate() ใน src/app/_lib/format-date.ts:
              </div>
              <div className="text-emerald-300 font-medium text-sm sm:text-base">
                📅 {currentFormattedDate}
              </div>
            </div>

            {/* Test Link to /_lib */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-400">
                ทดสอบเข้า URL ของ Private Folder ทางเบราว์เซอร์:
              </span>
              <Link
                href="/_lib"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-300 text-xs font-semibold transition"
              >
                <span>🔒</span>
                <span>คลิกทดสอบเปิด /_lib (จะติด 404 Not Found)</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
