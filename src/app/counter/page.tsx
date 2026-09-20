import Counter from "../components/Counter";

export default function CounterPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 sm:text-4xl">
          Counter App Demo
        </h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base">
          หน้าสาธิตการใช้ React State ใน Client Component
        </p>
      </div>

      <Counter />
    </main>
  );
}
