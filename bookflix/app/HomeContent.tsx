"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ContentRow from "./components/ContentRow";
import { FEATURED_BOOK, GENRE_ROWS, MOCK_BOOKS } from "./lib/mockData";
import { supabase } from "@/app/lib/supabase";
import { signInWithGoogle, devLogin } from "@/app/lib/auth-utils";
import { getMyList } from "./lib/bookmarks";
import { getContinueReading } from "./lib/progress";
import type { Book } from "./lib/mockData";

interface HomeContentProps {
  initialBooks: Book[];
}

export default function HomeContent({ initialBooks }: HomeContentProps) {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [myList, setMyList] = useState<Book[]>([]);
  const [continueReading, setContinueReading] = useState<Book[]>([]);

  useEffect(() => {
    setMounted(true);
    const safetyTimer = setTimeout(() => setLoading(false), 2000);

    // Check Dev User first
    const localDevUser = localStorage.getItem("dev_user");
    if (localDevUser) {
      setUser(JSON.parse(localDevUser));
      setLoading(false);
      clearTimeout(safetyTimer);
      return;
    }

    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }: any) => {
        setUser(session?.user ?? null);
        setLoading(false);
        clearTimeout(safetyTimer);
      }).catch(() => setLoading(false));

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
        if (!localStorage.getItem("dev_user")) {
          setUser(session?.user ?? null);
        }
      });

      return () => {
        subscription.unsubscribe();
        clearTimeout(safetyTimer);
      };
    } else {
      setLoading(false);
      clearTimeout(safetyTimer);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getMyList().then(setMyList);
      getContinueReading().then(setContinueReading);
    }
  }, [user]);

  const featuredBooks = MOCK_BOOKS.filter(b => b.is_verified).slice(0, 5);
  const allBooks = MOCK_BOOKS;

  if (loading || (!user && !localStorage.getItem("dev_user"))) {
    return <main className="min-h-screen" style={{ background: "#0b0b0f" }} />; // Simple black screen while checking auth
  }

  return (
    <main className="min-h-screen pb-20" style={{ background: "#0b0b0f" }}>
      <Navbar />
      <HeroSection books={featuredBooks} />

      <div className="relative z-10 -mt-16 sm:-mt-24 pb-16 px-4 md:px-12">
        {continueReading.length > 0 && <ContentRow title="Continue Reading" books={continueReading} />}
        {myList.length > 0 && <ContentRow title="My Library" books={myList} />}

        {GENRE_ROWS.map((row) => {
          const rowBooks = allBooks.filter(b => b.genre.includes(row.genre));
          if (!rowBooks.length) return null;
          return <ContentRow key={row.key} title={row.title} books={rowBooks} />;
        })}
        
        <ContentRow title="Must Read Classics" books={allBooks.filter(b => b.genre.includes("Classic")).reverse()} />
      </div>

      <footer className="text-center py-20 opacity-30 text-[10px] uppercase tracking-[0.3em] text-[#A47DAB]">
        BookFlix Global Manuscript Archive
      </footer>
    </main>
  );
}
