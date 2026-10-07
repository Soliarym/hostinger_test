# ประวัติการเปลี่ยนแปลงระบบ (System Changelog)

### ข้อมูลการแก้ไข (Modification Info)
- **วันและเวลาที่แก้ไข**: 7 ตุลาคม 2026 เวลา 10:30 น. (2026-10-07T10:30:00+07:00)
- **ชื่อ Agent และ โมเดล AI ที่ใช้งาน**: Antigravity (Gemini 3.8 Flash)
- **เวอร์ชันของโปรแกรม**: v1.6.0 (Next.js Route Groups `(auth)` & Real Authentication Demo)
- **ข้อมูลอื่นๆ ที่เกี่ยวข้อง**: Next.js 16 App Router Route Groups `(groupName)`, Shared Auth Layout, Prisma SQLite User model, Auto-fill Default Admin (`admin` / `admin`), Login / Register / Forgot Password, Dynamic Navbar Session
- **สถานะการ Deploy**: รันและทดสอบบน Local Dev Server (`http://localhost:3000`) เรียบร้อยแล้ว (Build ผ่าน 100% และทดสอบเบราว์เซอร์อัตโนมัติผ่านสมบูรณ์)

### ปัญหาที่พบ หรือความต้องการที่ต้องปรับปรุง (Issues / Requirements)
- ผู้ใช้ต้องการสร้างโครงสร้าง **Route Group** ใน Next.js ให้ใช้งานได้จริง ประกอบด้วย:
  1. หน้า **Login** (`/login`)
  2. หน้า **Register** (`/register`)
  3. หน้า **Forgot Password** (`/forgot-password` และ `/forgotpassword`)
  4. สร้าง **Default User**: Username `admin`, Password `admin` สำหรับทดสอบใช้งานได้จริง

### วิธีการแก้ไข (Solution)
1. **ออกแบบและสร้างโครงสร้าง Route Group `src/app/(auth)/`**:
   - ใช้หลักการ Route Group ของ Next.js App Router โดยตั้งชื่อโฟลเดอร์ในวงเล็บ `(auth)` ทำให้สามารถจัดกลุ่มและใช้งาน Shared Layout ร่วมกันได้ โดยชื่อโฟลเดอร์จะไม่ถูกนำไปใส่ใน URL บนเบราว์เซอร์
   - URL จึงคงความกระชับและเป็นมาตรฐาน: `/login`, `/register`, `/forgot-password`
2. **สร้าง Shared Auth Layout (`src/app/(auth)/layout.tsx`)**:
   - แสดงกล่องการ์ดโมเดิร์นแบบ Dark Glassmorphism
   - เพิ่มแถบ Navigation Tabs ให้ผู้ใช้สามารถสลับหน้าไปมาระหว่างเข้าสู่ระบบ, สมัครสมาชิก, และลืมรหัสผ่านได้อย่างลื่นไหล
   - แสดง Badge อธิบายแนวคิด Route Group และกล่องบอกข้อมูล Default Admin
3. **ปรับปรุงฐานข้อมูล SQLite ด้วย Prisma**:
   - เพิ่ม Model `User` ใน `prisma/schema.prisma` (ฟิลด์: id, username, email, password, role, createdAt, updatedAt)
   - อัปเดต `prisma/seed.ts` ให้ Seed ผู้ใช้เริ่มต้น: username: `admin`, password: `admin`, email: `admin@example.com`, role: `admin`
   - รันคำสั่ง `prisma db push` และ `prisma db seed` บันทึกลง SQLite `dev.db` สำเร็จ
4. **สร้าง Real Authentication API Routes**:
   - `src/app/api/auth/login/route.ts`: ตรวจสอบผู้ใช้และรหัสผ่านจาก DB พร้อมตั้งค่า Cookie Session `auth_user`
   - `src/app/api/auth/register/route.ts`: ตรวจสอบและลงทะเบียนผู้ใช้ใหม่ลง DB
   - `src/app/api/auth/forgot-password/route.ts`: ตรวจสอบชื่อผู้ใช้/อีเมล และอัปเดตรหัสผ่านใหม่ลง DB
   - `src/app/api/auth/me/route.ts`: ดึงข้อมูลผู้ใช้ปัจจุบันจาก Session Cookie
   - `src/app/api/auth/logout/route.ts`: เคลียร์ Session Cookie เมื่อผู้ใช้กดออกจากระบบ
5. **สร้างหน้าเพจ UI ให้ใช้งานได้จริง**:
   - `src/app/(auth)/login/page.tsx`: มีปุ่มด่วน "ใส่ข้อมูล Admin" ช่วย Auto-fill `admin` / `admin` ให้ทดสอบได้ทันที มีการแสดงผลสถานะแจ้งเตือนเมื่อสำเร็จหรือผิดพลาด
   - `src/app/(auth)/register/page.tsx`: ฟอร์มรับข้อมูล Username, Email, Password, Confirm Password พร้อมการตรวจสอบความถูกต้อง
   - `src/app/(auth)/forgot-password/page.tsx`: ฟอร์มค้นหาบัญชีและตั้งรหัสผ่านใหม่
   - `src/app/(auth)/forgotpassword/page.tsx`: สร้าง Alias Route รองรับ URL ที่ไม่มีขีดกลาง
6. **ปรับปรุง Navbar และหน้าแรก**:
   - อัปเดต Version Badge เป็น `v1.6.0`
   - ปรับปรุง Navbar ให้ตรวจจับสถานะการเข้าสู่ระบบแบบ Real-time แสดงชื่อผู้ใช้ `👤 admin`, Badge `ADMIN` และปุ่ม "ออกจากระบบ" หรือปุ่ม "เข้าสู่ระบบ/สมัครสมาชิก"
   - เพิ่ม Section อธิบาย Route Group Architecture บนหน้าแรก พร้อมตารางเปรียบเทียบ Directory vs URL
7. **ทดสอบระบบ**:
   - รัน `npm run build` ผ่าน 100% ไม่มีข้อผิดพลาด
   - ทดสอบผ่าน Browser Subagent ทั้งการล็อกอินด้วย `admin`/`admin`, การสลับหน้า, การแสดงผลบน Navbar และการทดสอบ Route ต่างๆ ผ่านครบถ้วน

### รายละเอียด Code / Function ส่วนสำคัญที่แก้ไข (Before vs After)

#### 1. `prisma/schema.prisma`
- **ก่อนแก้ไข (Before)**:
```prisma
model Product {
  id             Int      @id @default(autoincrement())
  name           String
  price          Float
  description    String
  category       String
  inStock        Boolean  @default(true)
  specifications String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```
- **หลังแก้ไข (After)**:
```prisma
model Product {
  id             Int      @id @default(autoincrement())
  name           String
  price          Float
  description    String
  category       String
  inStock        Boolean  @default(true)
  specifications String
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

model User {
  id        Int      @id @default(autoincrement())
  username  String   @unique
  email     String   @unique
  password  String
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

#### 2. `src/app/(auth)/layout.tsx` [NEW]
- **ก่อนแก้ไข (Before)**:
```text
(ยังไม่มีไฟล์ src/app/(auth)/layout.tsx)
```
- **หลังแก้ไข (After)**:
```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const navItems = [
    { href: "/login", label: "เข้าสู่ระบบ", icon: "🔑" },
    { href: "/register", label: "สมัครสมาชิก", icon: "📝" },
    { href: "/forgot-password", label: "ลืมรหัสผ่าน", icon: "🔒" },
  ];
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 ...">
      {/* Route Group Education Banner & Tabs */}
      ...
      {children}
    </div>
  );
}
```

#### 3. `src/app/(auth)/login/page.tsx` [NEW]
- **ก่อนแก้ไข (Before)**:
```text
(ยังไม่มีไฟล์ src/app/(auth)/login/page.tsx)
```
- **หลังแก้ไข (After)**:
```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  // Quick fill Admin account
  const handleAutofillAdmin = () => {
    setIdentifier("admin");
    setPassword("admin");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    ...
  };
  ...
}
```

#### 4. `src/app/components/Navbar.tsx`
- **ก่อนแก้ไข (Before)**:
```typescript
<div className="flex items-center gap-2.5">
  <Link href="/" ...>NextJS Test App</Link>
  <span className="... bg-indigo-500/15 text-indigo-300 ...">
    v1.5.0
  </span>
</div>
...
```
- **หลังแก้ไข (After)**:
```typescript
// Client-side authentication sync with version v1.6.0
<div className="flex items-center gap-2.5">
  <Link href="/" ...>NextJS Test App</Link>
  <span className="... bg-indigo-500/15 text-indigo-300 ...">
    v1.6.0
  </span>
</div>
...
{user ? (
  <div className="flex items-center gap-2 bg-slate-900 border ...">
    <span>👤 {user.username}</span>
    <span className="uppercase text-[10px] font-mono ...">{user.role}</span>
    <button onClick={handleLogout} className="text-rose-400 ...">ออกจากระบบ</button>
  </div>
) : (
  <div className="flex items-center gap-2">
    <Link href="/login" ...>เข้าสู่ระบบ</Link>
    <Link href="/register" ...>สมัครสมาชิก</Link>
  </div>
)}
```

---

### ข้อมูลการแก้ไข (Modification Info)
- **วันและเวลาที่แก้ไข**: 5 ตุลาคม 2026 เวลา 16:08 น. (2026-10-05T16:08:00+07:00)
- **ชื่อ Agent และ โมเดล AI ที่ใช้งาน**: Antigravity (Gemini 3.8 Flash)
- **เวอร์ชันของโปรแกรม**: v1.5.0 (Next.js Private Folders `_lib` Demo)
- **ข้อมูลอื่นๆ ที่เกี่ยวข้อง**: Next.js 16 App Router Private Folders (`_folderName`), Inaccessible URL Routes (Unroutable), Internal Date Utilities (`format-date.ts`)
- **สถานะการ Deploy**: รันและทดสอบบน Local Dev Server (`http://localhost:3000`) เรียบร้อยแล้ว (ยังไม่ Deploy ขึ้น Production VPS ตามความประสงค์ของผู้ใช้)

### ปัญหาที่พบ หรือความต้องการที่ต้องปรับปรุง (Issues / Requirements)
- ผู้ใช้ต้องการทดลองสร้างและทดสอบฟีเจอร์ Private Folder ใน Next.js App Router (ตามภาพโฟลเดอร์ `_lib` ที่มี `format-date.ts` และ `page.tsx`)
- ต้องการพิสูจน์การทำงานของ Private Folder ว่าจะไม่ถูก Route ออกไปเป็น URL สาธารณะ (แม้จะมี `page.tsx` อยู่ข้างในก็ตาม) แต่ยังคงสามารถ Import ฟังก์ชันภายในไปใช้งานร่วมกับหน้าอื่นได้ตามปกติ

### วิธีการแก้ไข (Solution)
1. **สร้าง Private Folder `src/app/_lib/`**:
   - สร้าง `src/app/_lib/format-date.ts` บรรจุฟังก์ชันจัดรูปแบบวันเวลาภาษาไทย `formatThaiDate()` และ `getPrivateFolderInfo()`
   - สร้าง `src/app/_lib/page.tsx` เพื่อทดสอบพิสูจน์ว่า URL `/_lib` จะไม่ถูก Route ออกสู่ภายนอก
2. **ผสานเข้ากับหน้าแรก (`src/app/page.tsx`)**:
   - นำเข้าฟังก์ชันจาก `@/app/_lib/format-date` มาแสดงผลวันเวลาปัจจุบันภาษาไทยแบบเรียลไทม์
   - เพิ่มการ์ด Private Folder Showcase พร้อมปุ่มลิงก์ทดสอบเปิด `/_lib` ซึ่งจะนำผู้ใช้ไปยังหน้า 404 Not Found ของระบบโดยอัตโนมัติ
3. **อัปเดตเวอร์ชัน UI (`v1.5.0`)**:
   - ปรับ Version Badge ใน `Navbar.tsx` และหน้า `page.tsx` เป็น `v1.5.0`
4. **ทดสอบระบบ**:
   - ทดสอบเรียกดู `http://localhost:3000/_lib` ได้ HTTP Status Code 404
   - ทดสอบหน้าแรก `http://localhost:3000/` แสดงผลวันเวลาภาษาไทยที่แปลงผ่าน `formatThaiDate()` ถูกต้องสมบูรณ์
   - รัน `npm run build` ผ่าน 100% ปราศจาก error

### รายละเอียด Code / Function ส่วนสำคัญที่แก้ไข (Before vs After)

#### 1. `src/app/_lib/format-date.ts` [NEW]
- **ก่อนแก้ไข (Before)**:
```text
(ยังไม่มีไฟล์ src/app/_lib/format-date.ts ในระบบ)
```
- **หลังแก้ไข (After)**:
```typescript
export function formatThaiDate(dateInput: Date | string | number = new Date()): string {
  const date = typeof dateInput === "object" ? dateInput : new Date(dateInput);
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  const thaiDays = [
    "วันอาทิตย์", "วันจันทร์", "วันอังคาร", "วันพุธ", "วันพฤหัสบดี", "วันศุกร์", "วันเสาร์"
  ];
  const dayOfWeek = thaiDays[date.getDay()];
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543;
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${dayOfWeek}ที่ ${day} ${month} พ.ศ. ${year} เวลา ${hours}:${minutes} น.`;
}
```

#### 2. `src/app/_lib/page.tsx` [NEW]
- **ก่อนแก้ไข (Before)**:
```text
(ยังไม่มีไฟล์ src/app/_lib/page.tsx ในระบบ)
```
- **หลังแก้ไข (After)**:
```tsx
export default function PrivateLibPage() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1>🔒 Secret Private Page</h1>
      <p>Next.js จะไม่มีทาง Route มาที่หน้านี้เด็ดขาด (จะติด 404 เสมอ)</p>
    </div>
  );
}
```

---

### ข้อมูลการแก้ไข (Modification Info)
- **วันและเวลาที่แก้ไข**: 5 ตุลาคม 2026 เวลา 12:02 น. (2026-10-05T12:02:00+07:00)
- **ชื่อ Agent และ โมเดล AI ที่ใช้งาน**: Antigravity (Gemini 3.8 Flash)
- **เวอร์ชันของโปรแกรม**: v1.4.1 (Centralized Global 404 Not Found Page)
- **ข้อมูลอื่นๆ ที่เกี่ยวข้อง**: Next.js 16 App Router, Consolidate Not Found Routes to Single Root `app/not-found.tsx`, Remove Section Scoped Not Found Pages
- **สถานะการ Deploy**: รันและทดสอบบน Local Dev Server (`http://localhost:3000`) เรียบร้อยแล้ว (ยังไม่ Deploy ขึ้น Production VPS ตามความประสงค์ของผู้ใช้)

### ปัญหาที่พบ หรือความต้องการที่ต้องปรับปรุง (Issues / Requirements)
- เดิมมีหน้า `not-found.tsx` เฉพาะหมวดอยู่ใน `src/app/posts/not-found.tsx` แยกต่างหากจาก Root
- ผู้ใช้ต้องการเอา `not-found.tsx` ในแต่ละ section ย่อยออกทั้งหมด แล้วให้ใช้หน้า `src/app/not-found.tsx` จุดเดียวคลุมทั้งเว็บไซต์ เพื่อให้มีความเป็นเอกภาพและจัดการง่าย

### วิธีการแก้ไข (Solution)
1. **ลบ Section Not Found Page**:
   - ลบไฟล์ `src/app/posts/not-found.tsx` ออกจากระบบ
2. **รวมศูนย์ที่ Root Not Found (`src/app/not-found.tsx`)**:
   - ทุกคำขอที่ผิดพลาด (URL 404 หรือการเรียก `notFound()` ในหมวดต่างๆ เช่น `/posts/...`, `/pokemon_list/...`) จะถูกส่งต่อมาแสดงผลที่หน้าจอ Global Not Found ส่วนกลางจุดเดียว
   - แสดงผลคำแนะนำ Animated Bounce: `⬆️ ใส่ link ผิด? แนะนำให้กดเลือกเมนูจากแถบ Navbar ด้านบน ชัวร์สุดครับ!`
   - มีการ์ดทางลัดครอบคลุม 4 โซนหลัก: หน้าแรก (`/`), โปเกมอน (`/pokemon_list`), สินค้า (`/products`), และบทความ (`/posts`)
3. **อัปเดตเวอร์ชัน UI (`v1.4.1`)**:
   - ปรับ Version Badge ใน `Navbar.tsx` และป้าย Release ใน `page.tsx` เป็น `v1.4.1`
4. **ทดสอบระบบ**:
   - ทดสอบบน Local Dev Server (`http://localhost:3000/posts/unknown`) ยืนยันว่าหน้าแสดงผลด้วย Root `not-found.tsx` สมบูรณ์
   - รัน `npm run build` ผ่าน 100% ปราศจาก error

### รายละเอียด Code / Function ส่วนสำคัญที่แก้ไข (Before vs After)

#### 1. การจัดการโครงสร้างไฟล์ Not Found (File Structure)
- **ก่อนแก้ไข (Before)**:
```text
src/app/
├── not-found.tsx          (Global 404)
└── posts/
    └── not-found.tsx      (Scoped 404 สำหรับ posts โดยเฉพาะ)
```
- **หลังแก้ไข (After)**:
```text
src/app/
└── not-found.tsx          (Global 404 จุดเดียวคลุมทั้งเว็บ ทุก section ย่อยวิ่งมาที่นี่)
```

#### 2. `src/app/components/Navbar.tsx`
- **ก่อนแก้ไข (Before)**:
```tsx
<span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
  v1.4.0
</span>
```
- **หลังแก้ไข (After)**:
```tsx
<span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
  v1.4.1
</span>
```

---

### ข้อมูลการแก้ไข (Modification Info)
- **วันและเวลาที่แก้ไข**: 5 ตุลาคม 2026 เวลา 11:52 น. (2026-10-05T11:52:00+07:00)
- **ชื่อ Agent และ โมเดล AI ที่ใช้งาน**: Antigravity (Gemini 3.8 Flash)
- **เวอร์ชันของโปรแกรม**: v1.4.0 (Custom 404 Not Found Page)
- **ข้อมูลอื่นๆ ที่เกี่ยวข้อง**: Next.js 16 App Router, Global `not-found.tsx`, Scoped `posts/not-found.tsx`, Tailwind CSS Dark Glassmorphism, Animated UI Cues
- **สถานะการ Deploy**: รันและทดสอบบน Local Dev Server พร้อมใช้งาน (ยังไม่ Deploy ขึ้น Production VPS ตามความประสงค์ของผู้ใช้)

### ปัญหาที่พบ หรือความต้องการที่ต้องปรับปรุง (Issues / Requirements)
- เดิมระบบใช้หน้า Error 404 แบบพื้นฐานของ Next.js ซึ่งไม่มีลูกเล่น ดีไซน์ไม่ตรงกับธีมมืดของเว็บ และไม่มีข้อความแนะนำผู้ใช้
- ผู้ใช้ต้องการสร้างหน้า `not-found.tsx` สวยๆ กรณีที่มีผู้ใช้งานพิมพ์หรือเข้าผ่าน URL ลิงก์ที่ผิด พร้อมใส่ข้อความแนะนำชัดเจนว่าให้ไปกดเลือกที่ Navbar ด้านบน ชัวร์สุด
- ให้รันบน Local Dev ให้ทดสอบก่อน ยังไม่ Deploy จริงขึ้น Production

### วิธีการแก้ไข (Solution)
1. **สร้าง Global 404 Page (`src/app/not-found.tsx`)**:
   - ออกแบบในสไตล์ Modern Dark Glassmorphism ผสมผสาน Gradient สีม่วง-ชมพู-อินดิโก
   - เพิ่ม Animated Direction Indicator ชี้เป้าด้านบน: `⬆️ ใส่ link ผิด? แนะนำให้กดเลือกเมนูจากแถบ Navbar ด้านบน ชัวร์สุดครับ!`
   - ตัวเลข 404 ขนาดใหญ่คมชัดพร้อมเส้นแสงเรืองแสง
   - กล่องเคล็ดลับการใช้งาน แนะนำให้คลิกผ่าน Navigation Bar
   - Grid การ์ดปุ่มทางลัดไปยังหน้าหลัก (Home), หน้าสำรวจ Pokemon (10 ธาตุ 100 ตัว), หน้ารายการสินค้า (Products), และหน้าบทความ (Posts)
   - ปุ่มลัด "กลับสู่หน้าหลักที่ปลอดภัย"
2. **สร้าง Scoped 404 Page (`src/app/posts/not-found.tsx`)**:
   - จัดทำหน้าแจ้งเตือนเมื่อไม่พบบทความ พร้อมข้อความแนะนำให้เลือกผ่าน Navbar ด้านบนเช่นเดียวกัน
3. **อัปเดตหมายเลขเวอร์ชัน UI (`v1.4.0`)**:
   - ปรับ Version Badge ใน `Navbar.tsx` และป้าย Release ใน `page.tsx` เป็น `v1.4.0`
4. **ทดสอบระบบบน Local Server**:
   - รันคำสั่ง `npm run build` ผ่านสมบูรณ์ และทดสอบเรียกดูหน้า 404 บน Local Dev (`http://localhost:3000/wrong-url`)

### รายละเอียด Code / Function ส่วนสำคัญที่แก้ไข (Before vs After)

#### 1. `src/app/not-found.tsx` [NEW]
- **ก่อนแก้ไข (Before)**:
```text
(ยังไม่มีไฟล์ src/app/not-found.tsx ในระบบ โดย Next.js แสดงผลหน้า default 404 พื้นฐาน)
```
- **หลังแก้ไข (After)**:
```tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-12 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Animated Direction Indicator to Navbar */}
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold animate-bounce shadow-lg shadow-indigo-500/10">
        <span className="text-base">⬆️</span>
        <span>ใส่ link ผิด? แนะนำให้กดเลือกเมนูจากแถบ Navbar ด้านบน ชัวร์สุดครับ!</span>
      </div>

      <div className="relative mb-2">
        <span className="text-8xl sm:text-9xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 drop-shadow-2xl select-none">
          404
        </span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
        ไม่พบหน้าที่คุณกำลังค้นหา (Page Not Found)
      </h1>
...
```

#### 2. `src/app/posts/not-found.tsx` [NEW]
- **ก่อนแก้ไข (Before)**:
```text
(ไฟล์ src/app/posts/not-found.tsx ว่างเปล่า)
```
- **หลังแก้ไข (After)**:
```tsx
import Link from "next/link";

export default function PostsNotFound() {
  return (
    <main className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-4 py-12 relative overflow-hidden">
      <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs sm:text-sm font-semibold animate-bounce shadow-lg shadow-purple-500/10">
        <span className="text-base">⬆️</span>
        <span>ใส่ link ผิด? แนะนำให้ไปกดเลือกที่ Navbar ด้านบน ชัวร์สุดครับ!</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
        ไม่พบบทความที่คุณกำลังตามหา
      </h1>
...
```

#### 3. `src/app/components/Navbar.tsx`
- **ก่อนแก้ไข (Before)**:
```tsx
<span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
  v1.3.0
</span>
```
- **หลังแก้ไข (After)**:
```tsx
<span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
  v1.4.0
</span>
```

---

### ข้อมูลการแก้ไข (Modification Info)
- **วันและเวลาที่แก้ไข**: 5 ตุลาคม 2026 เวลา 10:12 น. (2026-10-05T10:12:00+07:00)
- **ชื่อ Agent และ โมเดล AI ที่ใช้งาน**: Antigravity (Gemini 3.8 Flash)
- **เวอร์ชันของโปรแกรม**: v1.3.0 (Pokemon Catch-all Segments & Production Deployed)
- **ข้อมูลอื่นๆ ที่เกี่ยวข้อง**: Next.js 16 App Router, Dynamic Optional Catch-all Segments (`[[...slug]]`), PokéAPI Official Artwork CDN, Tailwind CSS, Hostinger KVM 2 VPS (`187.77.157.250`, `porpla.online`), PM2 Cluster Mode, Nginx Reverse Proxy
- **สถานะการ Deploy บน Production VPS**: Deploy สำเร็จสมบูรณ์ 100% บน `porpla.online` ผ่าน PM2 (`nextjs-test`) พร้อมเปิดใช้งานระบบ Catch-all segments จริงแล้ว

### ปัญหาที่พบ หรือความต้องการที่ต้องปรับปรุง (Issues / Requirements)
- ผู้ใช้ต้องการสร้างระบบ Next.js Catch-all segments แสดงรายชื่อและรายละเอียดข้อมูลโปเกมอน ครบ 10 ธาตุ ธาตุละ 10 ตัว (รวม 100 ตัว) ตามตัวอย่างภาพ UI Mockup
- โฟลเดอร์เดิมที่สร้างไว้คือ `...slug` (ไม่มีวงเล็บก้ามปู) ทำให้ Next.js มองเป็น Static path ปกติ ไม่สามารถดักจับ Dynamic URL segment parameters ได้

### วิธีการแก้ไข (Solution)
1. **ปรับโครงสร้าง Dynamic Routing**: ลบโฟลเดอร์เดิม `...slug` และสร้าง `src/app/pokemon_list/[[...slug]]/page.tsx` เพื่อรองรับ Optional Catch-all Route ทั้งระดับ `/pokemon_list`, `/pokemon_list/[type]` และ `/pokemon_list/[type]/[pokemon]` พร้อมสร้าง Alias ที่ `src/app/pokemon/[[...slug]]/page.tsx`
2. **สร้างฐานข้อมูลโปเกมอน (`pokemonData.ts`)**: บรรจุข้อมูลโปเกมอน 10 ธาตุ ธาตุละ 10 ตัว (100 ตัว) ประกอบด้วย ไฟ, น้ำ, พืช, ไฟฟ้า, น้ำแข็ง, ต่อสู้, พิษ, พื้นดิน, บิน, พลังจิต พร้อมรายละเอียดชื่อไทย-อังกฤษ, ส่วนสูง, น้ำหนัก, ความสามารถ (Ability) พร้อมคำแปล และรูปภาพ Official Artwork คุณภาพสูง
3. **พัฒนาหน้า UI Dark Theme ตรงตามแบบ Mockup**:
   - แถบเมนูด้านซ้าย: แสดงปุ่ม 10 ธาตุ พร้อมไอคอนและสีประจำธาตุ รองรับ Active state ชัดเจน
   - แถบตรงกลาง: แสดงรายชื่อโปเกมอน 10 ตัวในธาตุที่กำลังเลือก
   - การ์ดด้านขวา: แถบจำลอง Browser URL Address bar, รูปภาพโปเกมอน Official Artwork, ชื่อหัวการ์ด, ป้ายประเภท, สถิติต่างๆ, และกล่องข้อความคำอธิบาย
4. **อัปเดตแถบนำทาง Navbar และหน้าแรก**:
   - เพิ่มเมนู `Pokemon` (`/pokemon_list`) บน `Navbar.tsx`
   - ปรับเลขเวอร์ชันแสดงผลเป็น `v1.3.0` ทั้งบน Header Navbar และ Home Page Hero Badge

### รายละเอียด Code / Function ส่วนสำคัญที่แก้ไข (Before vs After)

#### 1. `src/app/pokemon_list/[[...slug]]/page.tsx` [NEW]
- **ก่อนแก้ไข (Before)**:
```text
(โฟลเดอร์ src/app/pokemon_list/...slug/page.tsx เป็นไฟล์ว่างเปล่าและชื่อโฟลเดอร์ไม่มีวงเล็บก้ามปู)
```
- **หลังแก้ไข (After)**:
```tsx
import Link from "next/link";
import { POKEMON_TYPES, PokemonType, PokemonItem } from "../pokemonData";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function PokemonCatchAllPage(props: PageProps) {
  const resolvedParams = await props.params;
  const slug = resolvedParams?.slug || [];

  // หา Type และ Pokemon จาก catch-all segments (slug)
  let activeType = POKEMON_TYPES.find((t) => t.id === "water") || POKEMON_TYPES[0];
  let activePokemon = activeType.pokemon[0];

  if (slug.length >= 1) {
    const matchedType = POKEMON_TYPES.find((t) => t.id.toLowerCase() === slug[0].toLowerCase());
    if (matchedType) activeType = matchedType;
    activePokemon = activeType.pokemon[0];
  }
  if (slug.length >= 2) {
    const matchedPokemon = activeType.pokemon.find((p) => p.id.toLowerCase() === slug[1].toLowerCase());
    if (matchedPokemon) activePokemon = matchedPokemon;
  }
  // เรนเดอร์ UI คอลัมน์ธาตุ คอลัมน์รายชื่อ และการ์ดข้อมูลตาม Mockup
...
```

#### 2. `src/app/components/Navbar.tsx`
- **ก่อนแก้ไข (Before)**:
```tsx
<span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
  v1.2.0
</span>
...
<nav className="flex items-center space-x-6 text-sm font-medium">
  <Link href="/" className="text-slate-300 hover:text-white transition">
    Home
  </Link>
  <Link href="/products" className="text-slate-300 hover:text-white transition">
    Products
  </Link>
```
- **หลังแก้ไข (After)**:
```tsx
<span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
  v1.3.0
</span>
...
<nav className="flex items-center space-x-6 text-sm font-medium">
  <Link href="/" className="text-slate-300 hover:text-white transition">
    Home
  </Link>
  <Link href="/pokemon_list" className="text-emerald-400 hover:text-emerald-300 font-semibold transition flex items-center gap-1">
    <span>⚡</span> Pokemon
  </Link>
  <Link href="/products" className="text-slate-300 hover:text-white transition">
    Products
  </Link>
```

---

### ข้อมูลการแก้ไข (Modification Info)
- **วันและเวลาที่แก้ไข**: 20 กันยายน 2026 เวลา 13:20 น. (2026-09-20T13:20:00+07:00)
- **ชื่อ Agent และ โมเดล AI ที่ใช้งาน**: Antigravity (Gemini 3.8 Flash)
- **เวอร์ชันของโปรแกรม**: v1.2.0 (VPS Deployment Preparation)
- **ข้อมูลอื่นๆ ที่เกี่ยวข้อง**: Hostinger KVM 2 VPS (`187.77.157.250`, `porpla.online`), PM2 Process Manager, Nginx Reverse Proxy, Ubuntu Linux

### ปัญหาที่พบ หรือความต้องการที่ต้องปรับปรุง (Issues / Requirements)
- ผู้ใช้ต้องการนำโปรเจกต์ Next.js (ที่เชื่อมต่อฐานข้อมูล SQLite เรียบร้อยแล้ว) ขึ้นไป Deploy บนเครื่อง Hostinger VPS (KVM 2) เพื่อแทนที่หน้าเว็บเดิม (`porpla.online`)
- ต้องการหลีกเลี่ยงการ Reinstall Ubuntu ใหม่เพื่อไม่ให้กระทบการตั้งค่า Nginx, Domain และ SSL ที่ทำงานอยู่แล้วบนเซิร์ฟเวอร์

### วิธีการแก้ไข (Solution)
1. **สร้างไฟล์ควบคุม PM2 (`ecosystem.config.js`)**: กำหนดค่าการรัน Next.js ในโหมด Production (Port 3000) พร้อมตั้งค่า `autorestart: true` และจำกัดหน่วยความจำ
2. **สร้างสคริปต์สำหรับการ Deploy อัตโนมัติ (`deploy.sh`)**: รวมขั้นตอน `npm install`, `npx prisma db push`, `npx prisma db seed`, `npm run build` และสั่ง `pm2 reload` ในสคริปต์เดียว
3. **อัปเดต UI Version Badge**: ปรับหมายเลขเวอร์ชันที่ Navbar เป็น `v1.2.0`
4. **จัดเตรียมแนวทาง Deployment ผ่าน Git / SSH**: เพื่อให้ผู้ใช้สามารถนำโค้ดขึ้นเซิร์ฟเวอร์ได้อย่างปลอดภัยและรวดเร็ว

### รายละเอียด Code / Function ส่วนสำคัญที่แก้ไข (Before vs After)

#### 1. `ecosystem.config.js` [NEW]
```javascript
module.exports = {
  apps: [
    {
      name: "nextjs-test",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
```

#### 2. `deploy.sh` [NEW]
```bash
#!/bin/bash
set -e
npm install
npx prisma db push
npx prisma db seed
npm run build
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production
pm2 save
```

#### 3. `src/app/components/Navbar.tsx`
- **ก่อนแก้ไข (Before)**:
```tsx
<span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
  v1.1.0
</span>
```
- **หลังแก้ไข (After)**:
```tsx
<span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
  v1.2.0
</span>
```

---

### ข้อมูลการแก้ไข (Modification Info)
- **วันและเวลาที่แก้ไข**: 20 กันยายน 2026 เวลา 13:00 น. (2026-09-20T13:00:00+07:00)
- **ชื่อ Agent และ โมเดล AI ที่ใช้งาน**: Antigravity (Gemini 3.8 Flash)
- **เวอร์ชันของโปรแกรม**: v1.1.0 (SQLite Database Migration)
- **ข้อมูลอื่นๆ ที่เกี่ยวข้อง**: Node.js v24.16.0, Next.js 16.3.4 Turbopack, Prisma ORM v6.19.3, SQLite (`prisma/dev.db`)

### ปัญหาที่พบ หรือความต้องการที่ต้องปรับปรุง (Issues / Requirements)
- เดิมข้อมูลสินค้าทั้งหมด (10 รายการ) เป็น In-Memory Mock Data อยู่ในโค้ดไฟล์ `data.ts` ยังไม่มีฐานข้อมูลจริงรองรับ ทำให้ข้อมูลไม่คงทนถาวร ไม่สามารถจัดการหรือบันทึกข้อมูลแบบไดนามิกได้ และไม่มี ORM รองรับการต่อยอดขยายระบบไปยังฐานข้อมูล Production (เช่น Hostinger MySQL)
- ผู้ใช้ต้องการให้นำข้อมูลสินค้าทั้งหมดไปจัดเก็บในฐานข้อมูล **SQLite**

### วิธีการแก้ไข (Solution)
1. **ติดตั้งและกำหนดค่า Prisma ORM v6**: ติดตั้ง `@prisma/client` และ `prisma` พร้อมสร้าง Schema สำหรับฐานข้อมูล SQLite จัดเก็บไว้ที่ `prisma/dev.db`
2. **สร้าง Model `Product`**: รองรับฟิลด์ `id`, `name`, `price`, `description`, `category`, `inStock`, `specifications` (จัดเก็บเป็น JSON String) พร้อม timestamp `createdAt` และ `updatedAt`
3. **จัดทำ Database Seed Script (`prisma/seed.ts`)**: ดำเนินการ Migrate และ Seed ข้อมูลเครื่องมือช่างทั้ง 10 รายการเข้าสู่ SQLite อัตโนมัติด้วยคำสั่ง `npx prisma db push` และ `npx prisma db seed`
4. **สร้าง Prisma Client Singleton (`src/lib/prisma.ts`)**: ป้องกันปัญหา Connection Exhaustion จาก Hot-Reload ของ Next.js
5. **ปรับปรุง Data Access Layer (`src/app/products/data.ts`)**: ปรับฟังก์ชัน `getProducts()` และ `getProductById(id)` ให้เรียก Query ข้อมูลจาก SQLite โดยตรงผ่าน Prisma Client พร้อมแปลง specifications คืนเป็น Object
6. **อัปเดต API Endpoint (`src/app/api/product/route.ts`)**: ให้ดึงข้อมูลจาก SQLite ส่งออกเป็น JSON response
7. **แสดงเลขเวอร์ชันที่ Navbar**: เพิ่ม Badge แสดง `v1.1.0` ที่ส่วนหัวของ UI ข้างชื่อแอปพลิเคชัน

### รายละเอียด Code / Function ส่วนสำคัญที่แก้ไข (Before vs After)

#### 1. `src/app/products/data.ts`
- **ก่อนแก้ไข (Before)**:
```typescript
export const products: Product[] = [ /* Hardcoded array 10 รายการ */ ];

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: number): Promise<Product | undefined> {
  return products.find((item) => item.id === id);
}
```
- **หลังแก้ไข (After)**:
```typescript
import { prisma } from "@/lib/prisma";

function parseSpecs(raw: string): Record<string, string> {
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function getProducts(): Promise<Product[]> {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { id: "asc" },
    });
    return dbProducts.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      inStock: p.inStock,
      specifications: parseSpecs(p.specifications),
    }));
  } catch (error) {
    console.error("Error fetching products from SQLite:", error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | undefined> {
  try {
    const p = await prisma.product.findUnique({
      where: { id },
    });
    if (!p) return undefined;
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      category: p.category,
      inStock: p.inStock,
      specifications: parseSpecs(p.specifications),
    };
  } catch (error) {
    console.error(`Error fetching product #${id} from SQLite:`, error);
    return undefined;
  }
}
```

#### 2. `src/app/api/product/route.ts`
- **ก่อนแก้ไข (Before)**:
```typescript
import { products } from "@/app/products/data";

export async function GET() {
  return Response.json({
    success: true,
    data: products,
  });
}
```
- **หลังแก้ไข (After)**:
```typescript
import { getProducts } from "@/app/products/data";

export async function GET() {
  const products = await getProducts();
  return Response.json({
    success: true,
    data: products,
  });
}
```

#### 3. `src/app/components/Navbar.tsx`
- **ก่อนแก้ไข (Before)**:
```tsx
<Link
  href="/"
  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 hover:opacity-90 transition"
>
  NextJS Test App
</Link>
```
- **หลังแก้ไข (After)**:
```tsx
<div className="flex items-center gap-2.5">
  <Link
    href="/"
    className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 hover:opacity-90 transition"
  >
    NextJS Test App
  </Link>
  <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
    v1.1.0
  </span>
</div>
```

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Project Updates & Features

### Dynamic Product Details (`/products/[id]`)
- **Product Central Data (`src/app/products/data.ts`)**: เพิ่มไฟล์ข้อมูลกลางสำหรับจัดการข้อมูลสินค้า mock data เช่น รหัสสินค้า, ชื่อ, ราคา, รายละเอียด, หมวดหมู่, สเปกสินค้า
- **Dynamic Route Page (`src/app/products/[id]/page.tsx`)**: หน้ารายละเอียดสินค้าแต่ละชิ้น รองรับ Next.js 15+ Async `params` พร้อมดีไซน์ Dark Theme ปรับแต่งสวยงาม
- **Product List (`src/app/products/page.tsx`)**: ปรับปรุงหน้ารวมสินค้าให้เชื่อมโยง Link ไปยังหน้ารายละเอียดสินค้าแต่ละชิ้นแบบไดนามิก

### Posts / Live YouTube Feed (`/posts`)
- **Veritasium YouTube Live RSS (`src/app/posts/page.tsx`)**: ดึงคลิปวิดีโอล่าสุดแบบ Real-time จากช่อง YouTube **Veritasium** (`https://www.youtube.com/feeds/videos.xml?channel_id=UCHnyfMqiRRG1u-2MsSQLbXA`)
- **Instant Skeleton Loading (`src/app/posts/loading.tsx`)**: หน้าจอรอโหลดแบบ Skeleton Shimmer Animation พร้อมข้อความภาษาไทย **"กำลังโหลดข้อมูล..."** และ Spinner แสดงผลทันทีระหว่างดึงข้อมูลแบบ Real-time
- **Error Boundary with Reset (`src/app/posts/error.tsx`)**: หน้าจอแสดงข้อผิดพลาด Client-side (ใช้ชื่อพิมพ์เล็กตามข้อกำหนด Next.js App Router เพื่อรองรับการ Deploy บน Hostinger/Linux) พร้อม Event `useEffect` บันทึก Log, กล่องแสดงรายละเอียด Error และปุ่มสีเขียวขนาดใหญ่ **"🔄 กดปุ่ม Reset เพื่อกลับมาหน้าเดิม"** ที่เรียกฟังก์ชัน `reset()` เพื่อลองโหลดใหม่
- **Interactive Error & Reset Panel (`src/app/posts/ErrorTrigger.tsx`)**: แผงควบคุมทดสอบระบบ Error & Reset บริเวณด้านบนของหน้าเพจ พร้อมปุ่มสีแดง **"💥 กดเพื่อจำลอง Error"** ให้ผู้ใช้คลิกทดสอบได้ทันที
- **Header & Fallback Protection**: ส่ง Header `User-Agent` จำลองเบราว์เซอร์ พร้อม `try...catch` และชุดข้อมูลสำรอง (Fallback) ป้องกันข้อผิดพลาด 403/500
- **YouTube Video Card UI**: แสดงผลภาพปกคลิปความละเอียดสูง, ยอดวิว (View count), วันที่เผยแพร่, คำอธิบายย่อ และปุ่มลิงก์เปิดชมบน YouTube
- **Navigation Integration**: เชื่อมโยงเมนู `Posts` ใน [Navbar.tsx](file:///d:/Projects/11%20Basic%20NextJS%20and%20Hostinger%20Deployed/nextjs_test/src/app/components/Navbar.tsx) เพื่อให้เข้าถึงได้จากทุกหน้า

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
