import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Book } from "@/app/lib/mockData";

interface HeroSectionProps {
  books: Book[];
}

export default function HeroSection({ books }: HeroSectionProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const currentBook = books[index];

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % books.length);
      setFade(true);
    }, 300);
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + books.length) % books.length);
      setFade(true);
    }, 300);
  };

  // Auto-cycle every 8 seconds
  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <section
      className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden group font-inter flex flex-col justify-center text-left"
    >
      {/* Background — blurred book cover */}
      <div 
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: `url(${currentBook.cover})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          filter: "blur(40px) brightness(0.4) saturate(1.2)",
          transform: "scale(1.1)",
          zIndex: 0
        }}
      />

      {/* Dark overlay with vertical gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(11,11,15,1))",
          zIndex: 1
        }}
      />

      {/* Navigation Arrows */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 md:left-8 z-50 p-3 md:p-4 rounded-full bg-black/20 hover:bg-[#A47DAB] border border-white/10 transition-all active:scale-90 flex items-center justify-center"
        style={{ minHeight: '44px', minWidth: '44px' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="15 18 9 12 15 6" /></svg>
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-4 md:right-8 z-50 p-3 md:p-4 rounded-full bg-black/20 hover:bg-[#A47DAB] border border-white/10 transition-all active:scale-90 flex items-center justify-center"
        style={{ minHeight: '44px', minWidth: '44px' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      {/* Content */}
      <div className={`relative z-10 w-full px-[24px] md:px-[84px] max-w-6xl transition-all duration-300 transform ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        
        {/* Badge Row */}
        <div className="flex gap-2 items-center justify-start mb-6">
          <div className="bg-[#A47DAB] rounded-sm px-2 py-1 shadow-lg">
            <span className="text-[10px] font-black text-white uppercase tracking-widest">FEATURED</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-sm px-2 py-1">
             <span className="text-[10px] font-black text-white uppercase tracking-widest">{currentBook.genre[0]}</span>
          </div>
        </div>

        {/* Title */}
        <h1
          className="font-bierika text-white tracking-tight text-left"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            fontWeight: 900,
            lineHeight: 0.9,
            textShadow: "0 10px 30px rgba(0,0,0,0.5)",
          }}
        >
          {currentBook.title}
        </h1>

        {/* Author / Year */}
        <p className="text-[#A47DAB] uppercase tracking-[0.3em] font-black text-sm mt-6">
          {currentBook.author} <span className="text-white/20 mx-2">•</span> {currentBook.year}
        </p>

        {/* Description */}
        <p className="text-white/60 text-left mt-6 text-sm md:text-base leading-relaxed max-w-xl line-clamp-3 md:line-clamp-none">
          {currentBook.description}
        </p>

        {/* Buttons */}
        <div className="flex flex-row items-center gap-4 mt-10">
          <Link
            href={`/read/${encodeURIComponent(currentBook.id)}`}
            className="flex items-center justify-center gap-3 font-black text-[11px] tracking-[0.2em] transition-all duration-300 uppercase text-white bg-[#A47DAB] hover:bg-[#8a5f92] px-8 py-4 rounded-sm shadow-2xl hover:shadow-[#A47DAB]/40 active:scale-95"
            style={{ minHeight: '44px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            START READING
          </Link>
          <button
            className="flex items-center justify-center gap-3 font-black text-[11px] tracking-[0.2em] transition-all duration-300 uppercase text-white border-2 border-white/20 hover:border-white hover:bg-white/10 px-8 py-4 rounded-sm active:scale-95"
            style={{ minHeight: '44px' }}
          >
            DETAILS
          </button>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {books.map((_, i) => (
          <div 
            key={i}
            className={`h-1 transition-all duration-300 rounded-full ${i === index ? "w-8 bg-[#A47DAB]" : "w-4 bg-white/20"}`}
          />
        ))}
      </div>
    </section>
  );
}
