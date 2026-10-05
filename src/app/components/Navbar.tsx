import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {/* Logo / Brand Title & Version */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 hover:opacity-90 transition"
          >
            NextJS Test App
          </Link>
          <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            v1.3.0
          </span>
        </div>

        {/* Navigation Links */}
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
          <Link href="/posts" className="text-slate-300 hover:text-white transition">
            Posts
          </Link>
          <Link href="/counter" className="text-slate-300 hover:text-white transition">
            Counter
          </Link>
          <Link href="/about" className="text-slate-300 hover:text-white transition">
            About
          </Link>
          <Link href="/contact" className="text-slate-300 hover:text-white transition">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
