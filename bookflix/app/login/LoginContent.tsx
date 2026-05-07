"use client";

import { signInWithGoogle } from "@/app/lib/auth-utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // SAFETY CATCH: If we land here with an auth code, redirect to the callback handler
  useEffect(() => {
    const code = searchParams.get('code');
    if (code) {
      router.push(`/auth/callback?code=${code}`);
    }
  }, [searchParams, router]);

  return (
    <main 
      className="relative min-h-screen flex flex-col items-center justify-center font-inter overflow-hidden" 
      style={{ backgroundColor: "#0b0b0f" }}
    >
      {/* Cinematic Background Elements */}
      <div 
        className="absolute inset-0 z-0 opacity-40" 
        style={{
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(164,125,171,0.15) 0%, transparent 60%),
            radial-gradient(ellipse at 50% 100%, rgba(164,125,171,0.2) 0%, transparent 70%)
          `
        }} 
      />

      {/* Light Rays / Glow at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[30vh] z-0 opacity-30"
        style={{
          background: "linear-gradient(to top, rgba(164,125,171,0.2) 0%, transparent 100%)",
          maskImage: "linear-gradient(to top, black, transparent)",
        }}
      />
      
      {/* Decorative lines like in the image */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[20vh] z-0 border-t-[1px] border-[#A47DAB33] rounded-[100%] blur-[2px]"
        style={{ transform: "translateX(-50%) translateY(50%)" }}
      />

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        
        {/* Logo */}
        <h1 
          className="font-cinzel uppercase"
          style={{
            fontSize: "clamp(3rem, 10vw, 5.5rem)",
            color: "#A47DAB",
            letterSpacing: "0.15em",
            marginBottom: "16px",
            lineHeight: 1,
            fontWeight: 900,
            textShadow: "0 0 30px rgba(164,125,171,0.3)"
          }}
        >
          BookFlix
        </h1>

        {/* Tagline */}
        <div
          className="flex flex-col gap-2 mb-16"
        >
          <span style={{ fontSize: "1.1rem", letterSpacing: "0.5em", color: "white", fontWeight: 700 }}>ALL YOUR</span>
          <span style={{ fontSize: "1.1rem", letterSpacing: "0.5em", color: "white", fontWeight: 700 }}>STORIES</span>
        </div>

        {/* Buttons Stack */}
        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
          {/* Main Login Button */}
          <button
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 group"
            style={{
              background: "#5a415e",
              color: "#ffffff",
              padding: "16px 40px",
              borderRadius: "50px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
              border: "1px solid rgba(164,125,171,0.3)",
              minHeight: "44px",
              minWidth: "44px",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation"
            }}
          >
            <span className="font-cinzel text-sm tracking-[0.2em] font-bold">LOGIN/SIGNUP</span>
          </button>

          {/* Secondary Buttons Row */}
          <div className="flex flex-row gap-4 w-full">
            <button
              onClick={() => router.push("/")}
              className="flex-1 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "#827184",
                color: "#14141c",
                padding: "14px 20px",
                borderRadius: "50px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                minHeight: "44px",
                minWidth: "44px",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation"
              }}
            >
              <span className="font-cinzel text-[10px] tracking-wider font-bold">Start Experience</span>
            </button>

            <button
              onClick={() => router.push("/browse")}
              className="flex-1 flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: "#827184",
                color: "#14141c",
                padding: "14px 20px",
                borderRadius: "50px",
                boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
                minHeight: "44px",
                minWidth: "44px",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation"
              }}
            >
              <span className="font-cinzel text-[10px] tracking-wider font-bold">Quick Launch</span>
            </button>
          </div>
          {/* DEV BYPASS BUTTON (Small and subtle) */}
          <button
            onClick={() => {
              const { devLogin } = require("@/app/lib/auth-utils");
              devLogin();
            }}
            className="mt-4 text-[#A47DAB] text-[9px] uppercase tracking-[0.4em] opacity-30 hover:opacity-100 transition-opacity font-black"
            style={{
              minHeight: "44px",
              minWidth: "44px",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation"
            }}
          >
            Emergency Dev Bypass
          </button>

        </div>
      </div>
    </main>
  );
}
