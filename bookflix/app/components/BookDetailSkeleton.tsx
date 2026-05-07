"use client";

export default function BookDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#0b0b0f] pt-24 px-8 md:px-16 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-10 max-w-5xl mx-auto">
        {/* Left: Cover Skeleton */}
        <div 
          className="flex-shrink-0 w-[220px] aspect-[2/3] bg-[#14141c] rounded-lg animate-pulse shadow-2xl" 
        />

        {/* Right: Details Skeleton */}
        <div className="flex-1 space-y-6 pt-4">
          <div className="flex gap-2">
            <div className="h-5 w-20 bg-[#14141c] rounded-full animate-pulse" />
            <div className="h-5 w-24 bg-[#14141c] rounded-full animate-pulse" />
          </div>
          <div className="h-12 w-3/4 bg-[#14141c] rounded-md animate-pulse" />
          <div className="h-6 w-1/4 bg-[#14141c]/60 rounded-md animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-[#14141c]/40 rounded animate-pulse" />
            <div className="h-4 w-full bg-[#14141c]/40 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-[#14141c]/40 rounded animate-pulse" />
          </div>
          <div className="flex gap-4 pt-6">
            <div className="h-12 w-32 bg-[#14141c] rounded-md animate-pulse" />
            <div className="h-12 w-32 bg-[#14141c] rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
