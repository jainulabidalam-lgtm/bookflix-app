"use client";

import SkeletonCard from "./SkeletonCard";

export default function LoadingScreen() {
  const skeletons = Array.from({ length: 12 });

  return (
    <div className="w-full min-h-screen bg-[#0b0b0f] pt-24 px-8 md:px-16 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="mb-12 space-y-3">
        <div className="h-9 w-64 bg-[#14141c] rounded-md animate-pulse" />
        <div className="h-4 w-48 bg-[#14141c]/60 rounded-md animate-pulse" />
      </div>

      {/* Grid of Skeletons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {skeletons.map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
