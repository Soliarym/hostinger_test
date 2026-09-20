# ประวัติการเปลี่ยนแปลงระบบ (System Changelog)

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
