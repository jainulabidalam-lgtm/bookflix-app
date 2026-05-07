"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Book } from "@/app/lib/mockData";
import { toggleBookmark, isBookmarked } from "@/app/lib/bookmarks";

export default function BookCard({ book }: { book: Book }) {
  const router = useRouter();
  const [marked, setMarked] = useState(false);

  useEffect(() => {
    isBookmarked(book.id).then(setMarked);
  }, [book.id]);

  const handleToggleMyList = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await toggleBookmark(book.id);
    if (result) {
      setMarked(result.bookmarked);
      window.dispatchEvent(new CustomEvent('refresh-home-data'));
    }
  };

  return (
    <div 
      className="relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-[1.02] bg-[#14141c] border border-white/5 hover:border-[#A47DAB]/50 shadow-2xl transform-gpu"
      style={{ willChange: "transform" }}
      onClick={() => router.push(`/book/${encodeURIComponent(book.id)}`)}
    >
      <Image
        src={book.cover || "/placeholder-cover.jpg"}
        alt={book.title}
        fill
        sizes="(max-width: 768px) 160px, 220px"
        loading="lazy"
        className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-50"
      />

      {/* Overlay - always present but more intense on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0f] via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Tags */}
      <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
        <div className="px-2 py-1 rounded bg-[#A47DAB] shadow-lg backdrop-blur-md">
            <p className="text-white text-[8px] font-black uppercase tracking-[0.2em]">
                {book.is_premium ? "Premium" : "Library"}
            </p>
        </div>
      </div>

      {/* Bookmark Button */}
      <button 
        onClick={handleToggleMyList}
        className="absolute top-3 left-3 z-20 p-3 rounded-full bg-black/40 border border-white/10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#A47DAB] hover:border-[#A47DAB] backdrop-blur-md flex items-center justify-center"
        style={{ minWidth: '44px', minHeight: '44px', touchAction: 'manipulation' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={marked ? "#fff" : "none"} stroke={marked ? "#fff" : "#fff"} strokeWidth="3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.94-8.94 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
      </button>

      {/* Content Info */}
      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-0 md:translate-y-4 group-hover:translate-y-0 transition-all duration-300">
        <h3 className="text-white text-sm font-black mb-1 leading-tight tracking-wide line-clamp-2 uppercase font-bierika">{book.title}</h3>
        <p className="text-[#A47DAB] text-[10px] font-bold mb-4 uppercase tracking-widest">{book.author}</p>
        
        <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            <button 
                onClick={(e) => { e.stopPropagation(); router.push(`/read/${book.id}`); }}
                className="flex-1 py-3 bg-[#A47DAB] text-white text-[10px] font-black rounded-lg uppercase tracking-[0.2em] shadow-lg transition-transform active:scale-95 flex items-center justify-center"
                style={{ minHeight: '44px', touchAction: 'manipulation' }}
            >
                Start
            </button>
            <div className="p-3 rounded-lg bg-white/10 border border-white/10 backdrop-blur-md flex items-center justify-center" style={{ minWidth: '44px', minHeight: '44px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            </div>
        </div>
      </div>
    </div>
  );
}
