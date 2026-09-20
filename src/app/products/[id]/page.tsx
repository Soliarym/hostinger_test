import Link from "next/link";
import { getProductById } from "../data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const productId = parseInt(id, 10);
  const product = !isNaN(productId) ? await getProductById(productId) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl text-center space-y-6 shadow-2xl">
          <div className="text-5xl">🔍</div>
          <h1 className="text-2xl font-bold text-white">ไม่พบข้อมูลสินค้า</h1>
          <p className="text-slate-400 text-sm">
            ไม่มีสินค้ารหัส <span className="font-mono text-indigo-400 font-bold">#{id}</span> ในระบบ
          </p>
          <div className="pt-2">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/25"
            >
              ← กลับไปหน้าสินค้าทั้งหมด
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-3xl" />
      </div>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 w-full space-y-8">
        {/* Breadcrumb / Back link */}
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Link href="/products" className="hover:text-indigo-400 transition-colors">
            สินค้าทั้งหมด
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-medium">{product.name}</span>
        </div>

        {/* Product Detail Card */}
        <article className="p-8 md:p-10 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl shadow-2xl space-y-8">
          {/* Header Info */}
          <div className="space-y-4 border-b border-slate-800/80 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs font-semibold">
                  รหัสสินค้า: #{product.id}
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium">
                  {product.category}
                </span>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                มีสินค้าพร้อมส่ง
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Main Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column: Description & Specs */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-2">รายละเอียดสินค้า</h2>
                <p className="text-slate-300 text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-200 mb-3">คุณสมบัติเฉพาะ (Specifications)</h2>
                <div className="rounded-2xl bg-slate-950/50 border border-slate-800/60 overflow-hidden divide-y divide-slate-800/60">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between px-4 py-3 text-sm">
                      <span className="text-slate-400 font-medium">{key}</span>
                      <span className="text-slate-200 font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Pricing & Purchasing */}
            <div className="flex flex-col justify-between p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-6">
              <div className="space-y-2">
                <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">ราคาพิเศษ</span>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                  ฿{product.price.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500">ราคารวมภาษีมูลค่าเพิ่มแล้ว</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-800/60">
                <button
                  type="button"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 transition-all duration-200 text-center cursor-pointer active:scale-95"
                >
                  🛒 สั่งซื้อสินค้า
                </button>
                <Link
                  href="/products"
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-xs transition-all text-center block"
                >
                  ← กลับไปเลือกสินค้าอื่น
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
