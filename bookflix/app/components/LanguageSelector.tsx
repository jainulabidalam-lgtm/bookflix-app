"use client";
import { useState, useEffect } from "react";
import { trigramMatch } from "../lib/trigram";

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" },
  { code: "hi", name: "Hindi" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "ja", name: "Japanese" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "zh-TW", name: "Chinese (Traditional)" },
  { code: "ru", name: "Russian" },
  { code: "it", name: "Italian" },
  { code: "pt", name: "Portuguese" },
  { code: "ko", name: "Korean" }
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [currentLangCode, setCurrentLangCode] = useState("en");

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const transCookie = cookies.find(row => row.startsWith("googtrans="));
    if (transCookie) {
      const parts = transCookie.split("/");
      const lastPart = parts[parts.length - 1];
      if (lastPart) setCurrentLangCode(lastPart);
    }
  }, []);

  const changeLanguage = (newLocale: string) => {
    const cookieValue = `/en/${newLocale}`;
    
    // Clear existing cookies first to avoid conflicts
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    
    if (newLocale !== 'en') {
      // Set for current domain
      document.cookie = `googtrans=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`;
      
      // Also try to set with leading dot for subdomains if applicable
      const host = window.location.hostname;
      if (host.includes('.')) {
        document.cookie = `googtrans=${cookieValue}; domain=.${host}; path=/; max-age=31536000; SameSite=Lax`;
      }
    }
    
    setCurrentLangCode(newLocale);
    // Give time for cookies to settle before reload
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const currentLang = LANGUAGES.find(l => l.code === currentLangCode)?.name || "English";
  const filtered = trigramMatch(search, LANGUAGES, (l) => l.name);

  return (
    <div 
      className="fixed z-[999] notranslate" 
      style={{ userSelect: "none", bottom: "24px", right: "24px" }}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center transition-colors duration-200"
        title="Change Language"
        style={{
          background: "#14141c",
          border: "1px solid rgba(164,125,171,0.3)",
          color: "#b3b3b3",
          padding: "10px 16px",
          borderRadius: "24px",
          fontSize: "13px",
          minHeight: "44px",
          minWidth: "44px",
          touchAction: "manipulation",
          WebkitTapHighlightColor: "transparent"
        }}
      >
        <span className="font-bold uppercase tracking-wider">{currentLangCode}</span>
      </button>

      {isOpen && (
        <div 
          className="absolute w-[200px] bg-[#0b0b0f] border border-[#A47DAB44] rounded-lg shadow-2xl flex flex-col p-2 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{ bottom: "40px", left: "0" }}
        >
          <div className="relative">
            <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#A47DAB66]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
              type="text" 
              placeholder="Search..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#14141c] border border-[#A47DAB22] rounded-md pl-8 pr-3 py-1.5 text-[11px] text-white outline-none focus:border-[#A47DAB] transition-colors"
              autoFocus
            />
          </div>

          <div className="flex flex-col gap-1 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
            {filtered.map(l => (
              <button 
                key={l.code}
                className={`w-full text-left px-3 py-2 rounded-md text-[11px] font-medium transition-all ${currentLangCode === l.code ? "bg-[#A47DAB] text-white" : "bg-[#14141c] text-[#b3b3b3] hover:bg-[#A47DAB11] hover:text-white"}`}
                onClick={() => changeLanguage(l.code)}
              >
                {l.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
