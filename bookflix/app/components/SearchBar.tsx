"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (query.trim().length === 0) return;

    const timer = setTimeout(() => {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [query, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative group notranslate">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-focus-within:stroke-[#A47DAB] transition-colors"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search books..."
        className="bg-white text-black text-[11px] font-bold rounded-[4px] pl-10 pr-4 py-2 w-[140px] md:w-[220px] focus:w-[280px] border-none outline-none transition-all duration-300 placeholder:text-black/40 shadow-xl"
      />
    </form>
  );
}
