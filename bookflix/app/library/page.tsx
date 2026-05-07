"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getMyList } from "../lib/bookmarks";
import type { Book } from "../lib/mockData";
import Link from "next/link";

export default function LibraryPage() {
  const [myList, setMyList] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyList().then(list => {
      setMyList(list);
      setLoading(false);
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white font-inter pb-20">
      <Navbar />
      
      <div className="pt-32 px-4 md:px-12 max-w-7xl mx-auto">
        <header className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bierika uppercase tracking-[0.3em] text-[#A47DAB]">My Library</h1>
            <p className="text-[10px] text-[#666] uppercase tracking-[0.4em] mt-2 font-bold">Your Saved Manuscripts</p>
        </header>
        
        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-2 border-[#A47DAB] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] text-[#A47DAB] uppercase tracking-widest animate-pulse font-bold">Accessing Archive...</p>
          </div>
        ) : myList.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
             {myList.map(book => (
               <Link 
                 key={book.id} 
                 href={`/book/${book.id}`}
                 className="relative group transition-all duration-300 hover:z-10"
               >
                  <div className="aspect-[2/3] overflow-hidden rounded-lg border border-white/5 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-[#A47DAB44] group-hover:shadow-[#A47DAB11]">
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1 truncate text-[#A47DAB]">{book.title}</p>
                        <p className="text-[8px] text-white/60 uppercase tracking-wider truncate">{book.author}</p>
                    </div>
                  </div>
               </Link>
             ))}
          </div>
        ) : (
          <div className="py-40 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A47DAB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            </div>
            <p className="text-[#666] uppercase tracking-[0.2em] text-[10px] font-bold mb-8">No manuscripts saved to your private collection.</p>
            <Link 
              href="/"
              className="px-8 py-3 bg-[#A47DAB] text-white rounded-full hover:bg-[#8a5f92] transition-all text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-[#A47DAB22]"
            >
              Discover Stories
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
