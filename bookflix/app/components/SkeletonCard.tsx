"use client";

export default function SkeletonCard() {
  return (
    <div className="flex flex-col gap-4 w-[160px] md:w-[220px]">
      {/* Main Card Shape */}
      <div 
        className="w-full aspect-[2/3] bg-[#14141c] rounded-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-skeleton-shimmer" />
      </div>
      
      {/* Text Lines */}
      <div className="space-y-2">
        <div className="h-4 w-5/6 bg-[#14141c] rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-skeleton-shimmer" />
        </div>
        <div className="h-3 w-1/2 bg-[#14141c]/50 rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-skeleton-shimmer" />
        </div>
      </div>

      <style jsx global>{`
        @keyframes skeleton-shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-skeleton-shimmer {
          animation: skeleton-shimmer 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}
