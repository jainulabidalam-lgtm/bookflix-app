import { Inter, Playfair_Display } from "next/font/google";
import { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import LanguageSelector from "./components/LanguageSelector";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "BookFlix — Stream Books, Free Forever",
  description:
    "A Netflix-style book streaming platform. 100% free, open-source content only. Discover, read, and enjoy thousands of books.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var cookies = document.cookie.split("; ");
              var trans = cookies.find(row => row.startsWith("googtrans="));
              if (trans) {
                var lang = trans.split("/").pop();
                if (lang && lang !== "en") {
                  document.documentElement.classList.add("translating");
                }
              }
            } catch(e) {}
          })();
        `}} />
      </head>
      <body className="min-h-full bg-[#0b0b0f] text-white" suppressHydrationWarning>
        <div id="google_translate_element" style={{ display: 'none', pointerEvents: 'none' }}></div>
        <Script id="google-translate-script" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              try {
                new google.translate.TranslateElement({
                    pageLanguage: 'en',
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false,
                }, 'google_translate_element');
              } catch(e) { console.warn('Google Translate init failed:', e); }
            }
          `}
        </Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <LanguageSelector />
        {children}
      </body>
    </html>
  );
}
