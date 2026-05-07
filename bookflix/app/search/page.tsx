"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import ContentRow from "@/app/components/ContentRow";
import LoadingScreen from "@/app/components/LoadingScreen";
import axios from "axios";
import type { Book } from "@/app/lib/mockData";
import { trigramMatchBooks } from "@/app/lib/trigram";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!query) {
        setLoading(false);
        return;
    }

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/search`, {
          params: {
            q: query,
          },
        });

        const mappedBooks = response.data as Book[];

        const sortedBooks = trigramMatchBooks(query, mappedBooks);
        setResults(sortedBooks);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <LoadingScreen />;

  return (
    <main className="min-h-screen pt-24 px-8 md:px-16" style={{ background: "#0b0b0f" }}>
      <header className="mb-12">
        <h1 className="text-3xl font-bierika text-white mb-2 text-start">
          Results for <span style={{ color: "#A47DAB" }}>"{query}"</span>
        </h1>
        <p className="text-[#b3b3b3] text-sm text-start">
          Found {results.length} books in the world digital library.
        </p>
      </header>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.map((book) => (
            <div key={book.id} className="group cursor-pointer">
              <div 
                className="aspect-[2/3] w-full rounded-md bg-[#14141c] mb-3 transition-transform duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-[#A47DAB] overflow-hidden"
                style={{
                  backgroundImage: `url(${book.cover})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                onClick={() => router.push(`/book/${encodeURIComponent(book.id)}`)}
              />
              <h3 className="text-white text-sm font-semibold truncate text-start">{book.title}</h3>
              <p className="text-[#b3b3b3] text-xs pb-1 truncate text-start">{book.author}</p>
              {book.readUrl && (
                <div className="text-start">
                    <span className="text-[10px] bg-[#A47DAB22] text-[#A47DAB] px-2 py-0.5 rounded-full border border-[#A47DAB44]">
                    FREE TO READ
                    </span>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="1">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          <h2 className="text-xl text-[#666] mt-4 font-bierika">No books found matching your library search</h2>
          <p className="text-[#444] text-sm mt-2">Try searching by title, author, or genre.</p>
        </div>
      )}
    </main>
  );
}

export default function SearchPage() {
  return (
    <main className="font-inter">
      <Navbar />
      <Suspense fallback={<LoadingScreen />}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
