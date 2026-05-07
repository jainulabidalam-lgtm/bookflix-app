"use client";

import { use, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import ContentRow from "@/app/components/ContentRow";
import { getBookById as fetchBookById, getSimilarBooks } from "@/app/lib/books";
import { MOCK_BOOKS } from "@/app/lib/mockData";
import BookDetailSkeleton from "@/app/components/BookDetailSkeleton";
import AIExplanation from "@/app/components/AIExplanation";
import type { Book } from "@/app/lib/mockData";

interface BookPageProps {
  params: Promise<{ id: string }>;
}

export default function BookPage({ params }: BookPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [inList, setInList] = useState(false);

  useEffect(() => {
    const loadBook = async () => {
      setLoading(true);
      const data = await fetchBookById(id);
      setBook(data);
      setLoading(false);
      
      // PREFETCH THE READER IMMEDIATELY
      if (data) {
        router.prefetch(`/read/${encodeURIComponent(id)}`);
      }
    };
    loadBook();
  }, [id, router]);

  if (loading) {
    return <BookDetailSkeleton />;
  }

  if (!book) {
    return (
      <main className="min-h-screen bg-[#0b0b0f] relative overflow-hidden">
        <Navbar />
        
        {/* Cinematic Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#A47DAB]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="flex flex-col items-center justify-center min-h-screen relative z-10 px-6 text-center">
          <div className="mb-8 p-6 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#A47DAB" strokeWidth="1.5" className="mb-4 mx-auto opacity-50">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-2 font-bierika">
              Title Not Found
            </h2>
            <p className="text-[#A47DAB] text-xs font-bold uppercase tracking-[0.3em] mb-8 opacity-70">
              The literary archive could not be reached
            </p>
            <button
              onClick={() => router.push("/")}
              className="bg-[#eee] text-black font-black text-[10px] tracking-[0.4em] px-10 py-4 rounded-full hover:bg-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-95 uppercase"
            >
              Return Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  const similar = getSimilarBooks(book);

  return (
    <main className="min-h-screen pb-16" style={{ background: "#000000" }}>
      <Navbar />

      {/* Blurred background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${book.cover || "/placeholder-cover.jpg"})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(30px) brightness(0.15) saturate(1.5)",
          transform: "scale(1.1)",
        }}
      />

      <div className="relative z-10 pt-24 px-8 md:px-16">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm mb-8 transition-colors duration-200 hover:text-white"
          style={{ color: "#b3b3b3" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>

        {/* Main detail layout */}
        <div className="flex flex-col md:flex-row gap-10 max-w-5xl">
          {/* Left: Cover */}
          <div className="flex-shrink-0">
            <div
              className="relative overflow-hidden rounded-lg"
              style={{
                width: "220px",
                aspectRatio: "2/3",
                boxShadow:
                  "0 8px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(164,125,171,0.15)",
              }}
            >
              {!imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.cover || "/placeholder-cover.jpg"}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center p-6 text-center"
                  style={{
                    background: "linear-gradient(135deg, #14141c, #1e1e2e)",
                    border: "1px solid rgba(164,125,171,0.2)",
                  }}
                >
                  <span className="font-bierika text-base" style={{ color: "#A47DAB" }}>
                    {book.title}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex-1 min-w-0">
            {/* Genre tags */}
            <div className="flex gap-2 flex-wrap mb-4">
              {book.genre.map((g) => (
                <span
                  key={g}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(164,125,171,0.12)",
                    border: "1px solid rgba(164,125,171,0.3)",
                    color: "#A47DAB",
                    letterSpacing: "0.08em",
                  }}
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1
              className="font-bierika text-white leading-tight mb-2"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              {book.title}
            </h1>

            {/* Author */}
            <p className="text-lg mb-1" style={{ color: "#A47DAB" }}>
              {book.author}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-6 text-sm" style={{ color: "#666" }}>
              <span>{book.year}</span>
              {book.pages && <span>{book.pages.toLocaleString()} pages</span>}
              <span
                className="px-2 py-0.5 rounded text-xs uppercase tracking-widest font-bold"
                style={{
                  background: book.editionKey ? "rgba(164,125,171,0.25)" : "rgba(164,125,171,0.08)",
                  color: book.editionKey ? "#fff" : "#A47DAB88",
                  border: "1px solid rgba(164,125,171,0.35)",
                  boxShadow: book.editionKey ? "0 0 10px rgba(164,125,171,0.3)" : "none"
                }}
              >
                {book.editionKey ? "Exclusive App Access" : book.license_type}
              </span>
            </div>

            {/* Description */}
            <p
              className="leading-relaxed mb-8 max-w-xl"
              style={{ color: "#b3b3b3", fontSize: "0.95rem" }}
            >
              {book.description}
            </p>

            {/* Buttons */}
            <div className="flex gap-3 md:gap-4 flex-wrap">
              <button
                onClick={() => router.push(`/read/${encodeURIComponent(book.id)}`)}
                className="flex items-center gap-2 px-6 md:px-8 py-3 rounded-md font-semibold text-sm transition-all duration-200 hover:brightness-110 active:scale-95 touch-manipulation"
                style={{
                  background: "linear-gradient(135deg, #A47DAB, #8a5f92)",
                  color: "#fff",
                  boxShadow: "0 0 24px rgba(164,125,171,0.3)",
                  minHeight: "48px",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Read Now
              </button>
              <button
                onClick={() => setInList((v) => !v)}
                className="flex items-center gap-2 px-6 md:px-8 py-3 rounded-md font-semibold text-sm transition-all duration-200 hover:bg-white/20 active:scale-95 touch-manipulation"
                style={{
                  background: inList
                    ? "rgba(164,125,171,0.15)"
                    : "rgba(255,255,255,0.1)",
                  border: inList
                    ? "1px solid rgba(164,125,171,0.5)"
                    : "1px solid rgba(255,255,255,0.25)",
                  color: inList ? "#A47DAB" : "#fff",
                  backdropFilter: "blur(8px)",
                  minHeight: "48px",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={inList ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {inList ? (
                    <path d="M20 6L9 17l-5-5" />
                  ) : (
                    <>
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </>
                  )}
                </svg>
                {inList ? "Added to List" : "Add to List"}
              </button>
            </div>
          </div>
        </div>

        {/* Similar books */}
        {similar.length > 0 && (
          <div className="mt-16">
            <ContentRow title="Similar Books" books={similar} />
          </div>
        )}
      </div>
      <AIExplanation book={book} />

      {/* Global Selection Arrows (< >) */}
      <div 
        className="fixed left-4 md:left-10 top-1/2 -translate-y-1/2 z-[100] group cursor-pointer"
        onClick={() => {
           const currentIndex = MOCK_BOOKS.findIndex((b: any) => b.id === book.id);
           const prevBook = MOCK_BOOKS[(currentIndex - 1 + MOCK_BOOKS.length) % MOCK_BOOKS.length];
           router.push(`/book/${prevBook.id}`);
        }}
      >
        <div className="relative">
          <div className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl group-hover:bg-[#A47DAB] group-hover:border-[#A47DAB] transition-all shadow-2xl active:scale-90">
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><polyline points="15 18 9 12 15 6" /></svg>
          </div>
          <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#14141c] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Previous Title
          </span>
        </div>
      </div>

      <div 
        className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 z-[100] group cursor-pointer"
        onClick={() => {
           const currentIndex = MOCK_BOOKS.findIndex((b: any) => b.id === book.id);
           const nextBook = MOCK_BOOKS[(currentIndex + 1) % MOCK_BOOKS.length];
           router.push(`/book/${nextBook.id}`);
        }}
      >
        <div className="relative">
          <div className="p-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl group-hover:bg-[#A47DAB] group-hover:border-[#A47DAB] transition-all shadow-2xl active:scale-90">
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5"><polyline points="9 18 15 12 9 6" /></svg>
          </div>
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#14141c] border border-white/10 text-white text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Next Title
          </span>
        </div>
      </div>
    </main>
  );
}
