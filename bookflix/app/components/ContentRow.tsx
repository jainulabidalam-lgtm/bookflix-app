"use client";

import { useRef, useState } from "react";
import BookCard from "./BookCard";
import SkeletonCard from "./SkeletonCard";
import type { Book } from "@/app/lib/mockData";

interface ContentRowProps {
  title: string;
  books: Book[];
  loading?: boolean;
}

export default function ContentRow({ title, books, loading }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth * 0.75 
        : scrollLeft + clientWidth * 0.75;
        
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-16 px-6 md:px-12 group/row relative">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1.5 h-8 bg-[#A47DAB] rounded-full shadow-[0_0_15px_rgba(164,125,171,0.5)]"></div>
        <h2 className="text-xl md:text-2xl font-black font-bierika text-white tracking-[0.1em] uppercase">
          {title}
        </h2>
      </div>
      
      <div className="relative">
        {/* Left Arrow - ALWAYS VISIBLE ON MOBILE, HOVER ON DESKTOP */}
        <div 
          className={`absolute top-0 bottom-0 left-[-15px] md:left-[-40px] z-40 w-12 md:w-16 cursor-pointer flex items-center justify-center transition-all duration-300 ${!isMoved ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          onClick={() => handleClick("left")}
          style={{ minHeight: '44px' }}
        >
           <div className="p-3 md:p-3 rounded-full bg-[#14141c]/80 border border-white/10 backdrop-blur-xl hover:bg-[#A47DAB] hover:border-[#A47DAB] transition-all shadow-2xl active:scale-90 flex items-center justify-center" style={{ minWidth: '44px', minHeight: '44px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" className="md:w-6 md:h-6"><polyline points="15 18 9 12 15 6" /></svg>
           </div>
        </div>

        <div 
          ref={rowRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-8 scrollbar-hide scroll-smooth px-2 snap-x snap-mandatory transform-gpu"
          style={{ transform: "translateZ(0)", WebkitOverflowScrolling: "touch" }}
          onScroll={(e) => setIsMoved(e.currentTarget.scrollLeft > 20)}
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : (
            books.map((book) => (
              <div key={book.id} className="flex-none w-[160px] md:w-[220px] snap-start transform-gpu">
                <BookCard book={book} />
              </div>
            ))
          )}
        </div>

        {/* Right Arrow - ALWAYS VISIBLE */}
        <div 
          className="absolute top-0 bottom-0 right-[-15px] md:right-[-40px] z-40 w-12 md:w-16 cursor-pointer flex items-center justify-center transition-all duration-300 opacity-100"
          onClick={() => handleClick("right")}
          style={{ minHeight: '44px' }}
        >
           <div className="p-3 md:p-3 rounded-full bg-[#14141c]/80 border border-white/10 backdrop-blur-xl hover:bg-[#A47DAB] hover:border-[#A47DAB] transition-all shadow-2xl active:scale-90 flex items-center justify-center" style={{ minWidth: '44px', minHeight: '44px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" className="md:w-6 md:h-6"><polyline points="9 18 15 12 9 6" /></svg>
           </div>
        </div>
      </div>
    </div>
  );
}
