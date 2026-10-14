import type { Metadata } from "next";
import Link from "next/link";
import { getProducts } from "../data";

export const metadata: Metadata = {
  title: "รายละเอียดสินค้า | NextJS Test App",
  description: "Next.js Nested Layout with Featured Products showcase",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
};

export default async function ProductDetailNestedLayout({
  children,
  params,
}: Props) {
  const { id } = await params;
  const currentId = parseInt(id, 10);
  const products = await getProducts();

  // Pick featured items that are different from the currently viewed product
  const otherProducts = products.filter((p) => p.id !== currentId);
  const featuredProduct = otherProducts.length > 0 ? otherProducts[0] : products[0];
  const quickPicks = otherProducts.slice(1, 4);

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* ========================================================
          ⭐ FEATURED PRODUCT SECTION (Nested Layout Header)
          วางตำแหน่งเด่นชัดถัดลงมาจาก Menu Bar (Navbar) ทันที
          ======================================================== */}
      <section className="relative w-full border-b border-indigo-500/20 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Background Decorative Ambient Glows */}
        <div className="absolute -top-24 left-1/4 w-96 h-48 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/10 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-0 right-10 w-72 h-36 bg-amber-500/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
          {/* Top Banner Tag: Explaining Nested Layout Architecture */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 font-bold uppercase tracking-wider text-[11px] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                ⭐ FEATURED PRODUCT SPOTLIGHT
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-slate-300 text-[11px]">
                ดีลเด็ดประจำวัน
              </span>
            </div>

            {/* Nested Layout Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-[11px] font-mono">
              <span className="text-indigo-400 font-bold">🧩 Nested Layout:</span>
              <span>app/products/[id]/layout.tsx</span>
            </div>
          </div>

          {/* Main Featured Showcase Card */}
          {featuredProduct && (
            <div className="relative rounded-2xl bg-gradient-to-r from-indigo-950/70 via-slate-900/80 to-purple-950/70 border border-indigo-500/30 p-4 sm:p-5 shadow-xl hover:border-indigo-400/50 transition-all duration-300 group">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Product Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
                      {featuredProduct.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      พร้อมส่งด่วนพิเศษ
                    </span>
                    <span className="text-slate-400 text-xs font-mono">
                      (สินค้าแนะนำนอกเหนือจากชิ้นที่กำลังชม #{currentId})
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <h2 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-indigo-200 transition">
                      {featuredProduct.name}
                    </h2>
                    <span className="text-xs text-slate-400 line-clamp-1 max-w-md">
                      — {featuredProduct.description}
                    </span>
                  </div>
                </div>

                {/* Right: Pricing & CTA Action */}
                <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                  <div className="text-left lg:text-right">
                    <span className="text-[11px] text-amber-400/90 font-medium block">
                      🔥 ราคาโปรโมชั่นพิเศษ
                    </span>
                    <span className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-pink-300 to-indigo-300">
                      ฿{featuredProduct.price.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    href={`/products/${featuredProduct.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 whitespace-nowrap cursor-pointer"
                  >
                    <span>ดูสินค้านี้เลย</span>
                    <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </Link>
                </div>
              </div>

              {/* Quick-Pick Suggestions Bar */}
              {quickPicks.length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-400 font-medium flex items-center gap-1">
                    <span>⚡ สินค้าแนะนำอื่นๆ:</span>
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {quickPicks.map((pick) => (
                      <Link
                        key={pick.id}
                        href={`/products/${pick.id}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-900/90 hover:bg-indigo-600/30 border border-slate-700/60 hover:border-indigo-400/50 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                      >
                        <span className="font-medium">{pick.name}</span>
                        <span className="text-indigo-400 font-mono text-[11px]">฿{pick.price.toLocaleString()}</span>
                      </Link>
                    ))}
                    <Link
                      href="/products"
                      className="px-2.5 py-1 rounded-lg bg-slate-800/50 hover:bg-slate-700/70 text-slate-400 hover:text-slate-200 text-[11px] transition"
                    >
                      ดูทั้งหมด ({products.length}) →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          PAGE CONTENT ({children})
          เนื้อหารายละเอียดของสินค้ารหัสนั้นๆ
          ======================================================== */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
