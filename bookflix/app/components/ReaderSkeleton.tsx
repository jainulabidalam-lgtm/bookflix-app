"use client";

export default function ReaderSkeleton() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-24 px-8 md:px-16 animate-in fade-in duration-500 overflow-hidden">
      {/* Navbar space placeholder */}
      <div className="h-12 w-full bg-[#14141c]/50 rounded mb-8 animate-pulse" />
      
      <div className="flex flex-col items-center max-w-4xl mx-auto space-y-8">
        {/* Title placeholder */}
        <div className="h-10 w-64 bg-[#14141c] rounded animate-pulse" />
        
        {/* Main "Page" area */}
        <div className="w-full aspect-[3/4] bg-[#14141c]/80 rounded-lg shadow-2xl relative p-12 space-y-6">
           <div className="h-4 w-full bg-[#2a2a3a] rounded animate-shimmer" />
           <div className="h-4 w-full bg-[#2a2a3a] rounded animate-shimmer" />
           <div className="h-4 w-4/5 bg-[#2a2a3a] rounded animate-shimmer" />
           <div className="h-4 w-full bg-[#2a2a3a] rounded animate-shimmer" />
           <div className="h-4 w-3/4 bg-[#2a2a3a] rounded animate-shimmer" />
           <div className="h-4 w-full bg-[#2a2a3a] rounded animate-shimmer" />
           <div className="h-4 w-5/6 bg-[#2a2a3a] rounded animate-shimmer" />
           <div className="mt-20 h-4 w-1/4 mx-auto bg-[#2a2a3a] rounded animate-shimmer" />
        </div>

        {/* Footer controls */}
        <div className="flex gap-10">
          <div className="h-8 w-8 rounded-full bg-[#14141c] animate-pulse" />
          <div className="h-8 w-24 bg-[#14141c] rounded animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-[#14141c] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
