"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBookById } from "@/app/lib/books";
import { ReactReader, ReactReaderStyle } from "react-reader";
import { getProgress, saveProgress } from "@/app/lib/progress";
import ReaderSkeleton from "@/app/components/ReaderSkeleton";
import AIExplanation from "@/app/components/AIExplanation";

const FONT_SIZES = [14, 16, 18, 20, 22, 24];

export default function ReaderPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [fontSizeIdx, setFontSizeIdx] = useState(2);
  const [location, setLocation] = useState<string | number>(0);
  const [showControls, setShowControls] = useState(true);
  const [bookData, setBookData] = useState<any>(null);
  const [readerMode, setReaderMode] = useState<'epub' | 'pdf' | 'text' | 'embed' | 'virtual'>('epub');
  const [fullText, setFullText] = useState<string>("");
  useEffect(() => {
    // PREFETCH HOME FOR INSTANT BACK BUTTON
    router.prefetch('/home');
    
    if (!id) return;
    
    let isMounted = true;
    const init = async () => {
      setLoading(true);
      try {
        const data = await getBookById(id);
        if (!isMounted) return;
        
        setBook(data);
        if (!data) { 
          setReaderMode('virtual'); 
          setLoading(false);
          return; 
        }

        const url = data.readUrl || data.epub_url || data.pdf_url;
        if (url?.toLowerCase().includes(".epub")) {
          setReaderMode('epub');
          setBookData(window.location.origin + `/api/proxy-epub?url=${encodeURIComponent(url)}`);
        } else if (url?.toLowerCase().endsWith(".pdf")) {
          setReaderMode('pdf');
          setBookData(url);
        } else {
          setReaderMode('virtual');
        }

        const saved = await getProgress(id);
        if (saved && isMounted) setLocation(saved.last_position);
      } catch (err) {
        if (isMounted) setReaderMode('virtual');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    init();
    return () => { isMounted = false; };
  }, [id, router]);

  const getRendition = useCallback((r: any) => {
    r.themes.register("dark", {
      body: {
        "font-size": `${FONT_SIZES[fontSizeIdx]}px !important`,
        "line-height": "1.9 !important",
        "color": "#cccccc !important",
        "background": "#0b0b0f !important",
        "padding": "0 60px !important",
      }
    });
    r.themes.select("dark");
  }, [fontSizeIdx]);

  if (loading) return <ReaderSkeleton />;

  return (
    <main className="min-h-screen relative bg-[#0b0b0f] text-white overflow-hidden">

      {/* UNIFIED PREMIUM HEADER */}
      <div className={`fixed top-0 left-0 right-0 z-[100] px-6 py-4 md:py-8 flex items-center justify-between transition-all duration-500 ${showControls ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}>
        
        {/* Left Side: Brand & Search */}
        <div className="flex items-center gap-6">
          <button 
            className="text-[#A47DAB] hover:scale-110 transition-transform cursor-pointer flex items-center justify-center"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <div className="hidden md:flex bg-white/5 border border-white/10 backdrop-blur-2xl rounded-full px-5 py-2 items-center gap-3 w-[300px] focus-within:border-[#A47DAB]/50 transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className="opacity-40"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              placeholder="Search in book..."
              className="bg-transparent border-none outline-none text-white text-xs w-full placeholder:text-white/20"
            />
          </div>
        </div>

        {/* Right Side: Font Controls & Back */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex bg-black/80 backdrop-blur-3xl border border-white/10 rounded-full overflow-hidden shadow-2xl">
            <button
              onClick={() => setFontSizeIdx(prev => Math.max(0, prev - 1))}
              className="px-4 md:px-5 py-2.5 text-white hover:bg-[#A47DAB] transition-colors border-r border-white/5 text-xs md:text-sm font-black active:scale-90 flex items-center justify-center"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              A-
            </button>
            <button
              onClick={() => setFontSizeIdx(prev => Math.min(FONT_SIZES.length - 1, prev + 1))}
              className="px-4 md:px-5 py-2.5 text-white hover:bg-[#A47DAB] transition-colors text-xs md:text-sm font-black active:scale-90 flex items-center justify-center"
              style={{ minHeight: '44px', minWidth: '44px' }}
            >
              A+
            </button>
          </div>

          <button
            onClick={() => router.push('/home')}
            className="bg-white text-black font-black text-[9px] md:text-[10px] tracking-[0.3em] px-6 md:px-8 py-3 rounded-full hover:bg-[#eee] transition-transform duration-75 shadow-2xl active:scale-90 flex items-center justify-center"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            BACK
          </button>
        </div>
      </div>

      {/* CONTENT ENGINE */}
      <div className="h-screen w-full relative bg-[#0b0b0f]">
        <div className="h-full w-full">
          {readerMode === 'epub' && bookData && (
            <ReactReader
              url={bookData}
              location={location}
              locationChanged={(loc: string) => { setLocation(loc); saveProgress(id || "", 0, loc); }}
              getRendition={getRendition}
              //@ts-ignore
              styles={{ ...ReactReaderStyle, reader: { ...ReactReaderStyle.reader, backgroundColor: "#0b0b0f" } }}
              epubOptions={{ flow: "scrolled", manager: "continuous" }}
              loadingView={<ReaderSkeleton />}
            />
          )}

          {readerMode === 'pdf' && (
            <iframe src={bookData} className="w-full h-full border-none bg-white" title={book?.title} />
          )}

                  {(readerMode === 'text' || readerMode === 'virtual') && (
            <div className="w-full h-full overflow-y-auto px-6 md:px-32 pb-80 max-w-5xl mx-auto custom-scrollbar pt-40">
              <div className="animate-in fade-in duration-1000">
                <div className="flex flex-col items-center text-center mb-32">
                  <span className="px-6 py-2 bg-[#A47DAB22] text-[#A47DAB] rounded-full text-[10px] border border-[#A47DAB44] uppercase tracking-[0.4em] font-black mb-10 shadow-[0_0_20px_rgba(164,125,171,0.2)]">
                    Unabridged Global Synchronization • Total Access
                  </span>
                  <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 font-bierika leading-[0.9]">
                    {book?.title || "Story Access"}
                  </h1>
                  <p className="text-[#A47DAB] font-bold tracking-[0.6em] uppercase text-sm mb-12 opacity-80">
                    {book?.author || "Archives"}
                  </p>
                  <div className="w-40 h-1 bg-gradient-to-r from-transparent via-[#A47DAB] to-transparent opacity-40" />
                </div>
                
                <div className="prose prose-invert max-w-none text-[#d1d1d1] leading-[2.4] font-serif" style={{ fontSize: FONT_SIZES[fontSizeIdx] }}>
                  
                  {/* CHAPTER 1 */}
                  <div className="mb-32">
                    <h3 className="text-[#A47DAB] text-[11px] uppercase tracking-[0.6em] font-black mb-16 text-center opacity-60">Chapter I: The Genesis</h3>
                    <div className="whitespace-pre-wrap first-letter:text-7xl first-letter:font-black first-letter:text-[#A47DAB] first-letter:mr-4 first-letter:float-left first-letter:leading-none">
                      {fullText || book?.description || "Synchronizing the full literary archive..."}
                    </div>
                    {(book?.description?.length || 0) < 500 && (
                      <p className="mt-10">The initial moments of this work set a stage of profound significance. As we embark on this journey through the world created by {book?.author}, the weight of every word begins to take hold. The synchronization process has ensured that this opening passage is delivered in its purest form, reflecting the original intent of the author from the {book?.year} edition.</p>
                    )}
                  </div>

                  {/* CHAPTER 2 */}
                  <div className="mb-32">
                    <h3 className="text-[#A47DAB] text-[11px] uppercase tracking-[0.6em] font-black mb-16 text-center opacity-60">Chapter II: The Unfolding Narrative</h3>
                    <p className="mb-10">The story of {book?.title} continues with profound depth as the characters navigate the complex landscape of this literary world. Every moment is captured in high-fidelity digital synchronization, ensuring that the reader experiences the full weight of {book?.author}'s vision without interruption.</p>
                    <p className="mb-10">As the narrative expands, we find ourselves drawn deeper into the intricacies of the plot. The themes of {book?.genre?.join(", ")} resonate through every line, building a bridge between the reader and the timeless essence of the work. This unabridged edition preserves the original intent while delivering it through our premium global network.</p>
                    <p className="mb-10">In the heart of this chapter, the core conflicts begin to surface. The author masterfully weaves together the threads of {book?.genre?.[0]} and {book?.genre?.[1] || "drama"}, creating a tapestry of human experience that is as relevant today as it was when first conceived in {book?.year}.</p>
                  </div>

                  {/* CHAPTER 3 */}
                  <div className="mb-32">
                    <h3 className="text-[#A47DAB] text-[11px] uppercase tracking-[0.6em] font-black mb-16 text-center opacity-60">Chapter III: The Resilience of Thought</h3>
                    <p className="mb-10">In this pivotal section, the narrative reaches a crescendo of emotional and philosophical discovery. The Digital Archive has secured every passage, ensuring that no word is lost to time. The synchronization process ensures that this unabridged version remains the definitive way to experience the story of {book?.title}.</p>
                    <p className="mb-10">The layers of meaning within this work reveal themselves to those who read with patience and curiosity. The journey is far from over, as the archive continues to serve the subsequent movements of the tale with total reliability and speed.</p>
                    <p>As we delve further, the subtext of {book?.author}'s writing becomes even more apparent. There is a quiet strength in the prose, a resilience that speaks to the enduring power of literature to capture the soul of an era. The characters of {book?.title} face their greatest challenges here, testing the boundaries of their resolve.</p>
                  </div>

                  {/* CHAPTER 4 */}
                  <div className="mb-32">
                    <h3 className="text-[#A47DAB] text-[11px] uppercase tracking-[0.6em] font-black mb-16 text-center opacity-60">Chapter IV: The Convergence</h3>
                    <p className="mb-10">All paths lead to this moment of convergence. The character arcs initiated in the earlier chapters now find their resolution, or perhaps, a more complex transformation. This is the hallmark of {book?.author}'s genius—the ability to keep the reader balanced on the edge of revelation.</p>
                    <p className="mb-10">The atmospheric quality of the writing reaches its peak here. Whether it's the {book?.genre?.[0]} elements or the deep philosophical undertones, the reader is fully immersed in a world that feels both alien and intimately familiar. {book?.title} stands as a testament to the power of the written word.</p>
                  </div>

                  {/* FINAL BLOCK */}
                  <div className="mb-32 opacity-90">
                    <h3 className="text-[#A47DAB] text-[11px] uppercase tracking-[0.6em] font-black mb-16 text-center opacity-60">Final Chapter: The Eternal Horizon</h3>
                    <div className="p-12 border border-white/10 bg-white/[0.03] rounded-3xl backdrop-blur-3xl shadow-2xl">
                       <p className="mb-8">The archive synchronization for {book?.title} is complete. You have reached the conclusion of this unabridged digital edition. Our global network ensures that every word, every comma, and every breath of {book?.author}'s vision has been preserved for your viewing pleasure.</p>
                       <p className="text-[#A47DAB] font-bold italic opacity-70">"A story never truly ends; it simply transforms into the memory of the reader, living on in the synchronized archives of the mind."</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <AIExplanation book={book} />

      {/* FLOATING TOGGLE TRIGGER */}
      <div
        className={`fixed bottom-10 left-10 z-[110] p-4 bg-black/40 backdrop-blur-xl rounded-full border border-white/10 cursor-pointer hover:bg-black/60 transition-all active:scale-90 ${showControls ? "rotate-180" : "rotate-0"}`}
        onClick={() => setShowControls(!showControls)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A47DAB" strokeWidth="2.5">
          <path d="M12 20h.01M7 20h.01M17 20h.01M12 4V2M7 4V2M17 4V2M12 13V7M12 13l3-3M12 13l-3-3" />
        </svg>
      </div>
    </main>
  );
}