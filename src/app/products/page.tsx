import Link from "next/link";
import { getProducts } from "./data";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-16">
      {/* Background Decorative Gradients */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-3xl" />
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-white">รายการสินค้าทั้งหมด</h1>
          <p className="text-slate-400 text-sm">คลิกเลือกดูรายละเอียดของสินค้าแต่ละรายการได้ทางด้านล่าง</p>
        </div>

        {/* Products Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs font-semibold">
                    ID: {item.id}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{item.category}</span>
                </div>

                <Link href={`/products/${item.id}`} className="block">
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-indigo-300 transition-colors">
                    {item.name}
                  </h3>
                </Link>
              </div>

              {/* Price & Action */}
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">ราคา</span>
                  <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                    ฿{item.price.toLocaleString()}
                  </span>
                </div>

                <Link
                  href={`/products/${item.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-800 group-hover:bg-indigo-600 text-slate-200 group-hover:text-white text-xs font-semibold transition-all inline-block"
                >
                  รายละเอียด →
                </Link>
              </div>
            </div>
          ))}
        </section>

        {/* Back Link */}
        <div className="text-center pt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium text-sm transition-all"
          >
            ← กลับหน้าหลัก (Home)
          </Link>
        </div>
      </main>
    </div>
  );
}
