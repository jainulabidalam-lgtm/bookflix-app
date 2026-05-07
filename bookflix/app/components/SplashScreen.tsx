"use client";

import { useEffect, useState } from "react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"visible" | "fading">("visible");

  useEffect(() => {
    // Start fading out after 1.8s, then call onComplete after 0.5s fade
    const fadeTimer = setTimeout(() => setPhase("fading"), 1800);
    const doneTimer = setTimeout(() => onComplete(), 2300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "#000000",
        transition: "opacity 0.5s ease",
        opacity: phase === "fading" ? 0 : 1,
      }}
    >
      {/* Abstract red glow - left and right arcs mimicking the reference image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 0% 80%, #ff2c2c55 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 100% 80%, #ff2c2c44 0%, transparent 60%)",
        }}
      />

      {/* Bottom horizontal glow strip */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #ff2c2c 30%, #ffffff 50%, #ff2c2c 70%, transparent 100%)",
          boxShadow:
            "0 0 60px 30px #ff2c2c88, 0 0 120px 60px #ff2c2c44, 0 -20px 80px 20px #ff2c2c33",
        }}
      />

      {/* Subtle red arc reflections on floor */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #ff2c2c18 0%, transparent 100%)",
        }}
      />

      {/* Center logo text */}
      <div
        className="relative z-10 animate-fade-in-up"
        style={{ animationDelay: "0.2s", animationFillMode: "both" }}
      >
        <h1
          className="font-bierika animate-glow-pulse tracking-[0.3em] select-none"
          style={{
            color: "#A47DAB",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            letterSpacing: "0.3em",
          }}
        >
          BookFlix
        </h1>
      </div>
    </div>
  );
}
