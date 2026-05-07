"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/supabase";
import { signInWithGoogle, signOut, devLogin } from "@/app/lib/auth-utils";
import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });

    const checkUser = async () => {
      const localDevUser = localStorage.getItem("dev_user");
      if (localDevUser) {
        setUser(JSON.parse(localDevUser));
        return;
      }

      if (supabase) {
        const { data: { session } }: any = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      }
    };

    checkUser();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
        if (!localStorage.getItem("dev_user")) {
          setUser(session?.user ?? null);
        }
      });

      return () => {
        window.removeEventListener("scroll", onScroll);
        subscription.unsubscribe();
      };
    }

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center transition-all duration-200 ease-in-out font-inter"
      style={{
        height: "64px",
        paddingLeft: "4%",
        paddingRight: "4%",
        background: scrolled ? "rgba(11, 11, 15, 0.95)" : "linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      {/* Hamburger Menu Icon - TOP LEFT CORNER */}
      <button
        className="text-[#b3b3b3] hover:text-white transition-colors duration-200 flex items-center justify-center"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Spacer to push items to the right */}
      <div className="flex-grow"></div>

      {/* Right side items (Search, Login) */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <SearchBar />

        {/* LOGIN Button */}
        {!user && (
          <button
            onClick={signInWithGoogle}
            className="px-[16px] py-[6px] text-[11px] text-[#A47DAB] border border-[#A47DAB] rounded-[4px] transition-all duration-200 ease-in-out hover:bg-[#A47DAB] hover:text-white uppercase tracking-widest font-bold flex items-center justify-center"
            style={{ minHeight: '44px', minWidth: '80px' }}
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Drawer -> Refactored to Profile Dropdown */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 w-full h-full z-[190]"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Dropdown Container */}
          <div
            className="absolute z-[200] flex flex-col"
            style={{
              top: "64px",
              left: "4%",
              background: "#14141c",
              border: "1px solid rgba(164,125,171,0.2)",
              borderRadius: "8px",
              padding: "16px",
              minWidth: "200px",
              animation: "dropdownFadeIn 200ms ease forwards",
            }}
          >
            <style>{`
              @keyframes dropdownFadeIn {
                from { opacity: 0; transform: translateY(-8px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {/* Avatar & Name */}
            <div className="flex flex-col items-center mb-4">
              <button
                onClick={() => { setMobileMenuOpen(false); router.push("/profile"); }}
                className="rounded-full overflow-hidden border-2 border-[#A47DAB] transition-transform hover:scale-105 flex items-center justify-center"
                style={{ width: "60px", height: "60px", minHeight: '60px', minWidth: '60px' }}
              >
                {user?.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#14141c]"></div>
                )}
              </button>
              <div
                className="text-white text-base tracking-wider"
                style={{ marginTop: "8px" }}
              >
                {user?.user_metadata?.full_name || 'Reader'}
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-col w-full border-t border-[#A47DAB]/10 pt-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-colors duration-200 text-sm tracking-widest uppercase text-left flex items-center"
                style={{ padding: "10px 16px", color: "#b3b3b3", minHeight: '44px' }}
                onMouseOver={(e) => e.currentTarget.style.color = "#A47DAB"}
                onMouseOut={(e) => e.currentTarget.style.color = "#b3b3b3"}
              >
                HOME
              </Link>
              <Link
                href="/browse"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-colors duration-200 text-sm tracking-widest uppercase text-left flex items-center"
                style={{ padding: "10px 16px", color: "#b3b3b3", minHeight: '44px' }}
                onMouseOver={(e) => e.currentTarget.style.color = "#A47DAB"}
                onMouseOut={(e) => e.currentTarget.style.color = "#b3b3b3"}
              >
                BROWSE
              </Link>
              <Link
                href="/library"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-colors duration-200 text-sm tracking-widest uppercase text-left flex items-center"
                style={{ padding: "10px 16px", color: "#b3b3b3", minHeight: '44px' }}
                onMouseOver={(e) => e.currentTarget.style.color = "#A47DAB"}
                onMouseOut={(e) => e.currentTarget.style.color = "#b3b3b3"}
              >
                MY LIST
              </Link>
              <Link
                href="/upload"
                onClick={() => setMobileMenuOpen(false)}
                className="transition-colors duration-200 text-sm tracking-widest uppercase text-left flex items-center"
                style={{ padding: "10px 16px", color: "#b3b3b3", minHeight: '44px' }}
                onMouseOver={(e) => e.currentTarget.style.color = "#A47DAB"}
                onMouseOut={(e) => e.currentTarget.style.color = "#b3b3b3"}
              >
                UPLOAD
              </Link>

              {user ? (
                <button
                  onClick={() => { setMobileMenuOpen(false); signOut(); }}
                  className="transition-colors duration-200 text-sm tracking-widest uppercase text-left flex items-center"
                  style={{ padding: "10px 16px", color: "#ff4444", minHeight: '44px' }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#ff6666"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#ff4444"}
                >
                  LOGOUT
                </button>
              ) : (
                <button
                  onClick={() => { setMobileMenuOpen(false); signInWithGoogle(); }}
                  className="transition-colors duration-200 text-sm tracking-widest uppercase text-left flex items-center"
                  style={{ padding: "10px 16px", color: "#A47DAB", minHeight: '44px' }}
                  onMouseOver={(e) => e.currentTarget.style.color = "#ffffff"}
                  onMouseOut={(e) => e.currentTarget.style.color = "#A47DAB"}
                >
                  LOGIN
                </button>
              )}
            </div>
          </div>
        </>
      )}


      {/* Language Selector (Fixed Bottom Right) */}
      <LanguageSelector />
    </nav>
  );
}
