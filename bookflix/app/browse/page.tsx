"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import ContentRow from "@/app/components/ContentRow";
import { getAllBooks } from "@/app/lib/books";
import type { Book } from "@/app/lib/mockData";
import { FEATURED_BOOK, GENRE_ROWS } from "@/app/lib/mockData";

export default function BrowsePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const data = await getAllBooks();
      setBooks(data);
    };
    load();
  }, []);

  return (
    <main className="min-h-screen pb-20 bg-[#0b0b0f] font-inter">
      <Navbar />
      
      {/* Increased Top Padding for Navbar clearance */}
      <div className="pt-32 px-8 md:px-16">
        <header className="mb-20 border-l-4 border-[#A47DAB] pl-8 py-3">
            <h1 className="text-5xl md:text-6xl font-bierika text-white mb-4 tracking-tighter text-start uppercase">Global <span style={{ color: "#A47DAB" }}>Partition</span></h1>
            <p className="text-[#888] text-[11px] max-w-2xl uppercase tracking-[0.4em] text-start font-bold">
                Categorized access to regional manuscripts from Indian Epics to Japanese Classics and Memoirs.
            </p>
        </header>

        {/* FLEXIBLE SECTIONAL GRID */}
        <div className="space-y-24">
            {/* 1. REGIONAL PARTITIONS */}
            <section>
                <div className="space-y-20">
                    {GENRE_ROWS.map((row) => {
                        const rowBooks = books.filter(b => b.genre.includes(row.genre));
                        if (rowBooks.length === 0) return null;
                        return (
                            <div key={row.key} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <ContentRow title={row.title} books={rowBooks} />
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 2. DISCOVER SECTION */}
            <section className="pt-10 border-t border-white/5">
                <ContentRow title="Discover Something New" books={books.slice(0, 10).reverse()} />
            </section>
        </div>
      </div>

      <footer className="mt-32 text-center opacity-20 text-[9px] uppercase tracking-[0.6em] text-[#A47DAB] pb-10">
          BookFlix Secure Metadata Partition Engine
      </footer>
    </main>
  );
}
