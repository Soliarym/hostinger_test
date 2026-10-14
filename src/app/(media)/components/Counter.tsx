'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 max-w-sm w-full mx-auto transition-all duration-300">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
        Client Counter Component
      </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Interactive state management with React
      </p>

      {/* Count Display */}
      <div className="text-6xl font-extrabold text-indigo-600 dark:text-indigo-400 my-4 tracking-tight">
        {count}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3 w-full mt-4">
        <button
          onClick={decrement}
          className="flex-1 py-2.5 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-sm"
          aria-label="Decrease count"
        >
          - 1
        </button>

        <button
          onClick={reset}
          className="flex-1 py-2.5 px-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-sm"
          aria-label="Reset count"
        >
          Reset
        </button>

        <button
          onClick={increment}
          className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-md hover:shadow-indigo-500/25"
          aria-label="Increase count"
        >
          + 1
        </button>
      </div>
    </div>
  );
}
