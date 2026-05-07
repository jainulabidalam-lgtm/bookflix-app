"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      // If we find an auth code in the URL on ANY page, 
      // immediately send it to the official handler
      router.replace(`/auth/callback?code=${code}`);
    }
  }, [searchParams, router]);

  return null;
}

export default function AuthSafetyHandler() {
  return (
    <Suspense fallback={null}>
      <AuthHandler />
    </Suspense>
  );
}
