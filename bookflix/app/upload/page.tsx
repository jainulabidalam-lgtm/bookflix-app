"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { supabase } from "@/app/lib/supabase";

export default function UploadPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const author = formData.get("author");
    const genre = formData.get("genre")?.toString().split(",") || [];

    const res = await fetch("/api/upload-book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        author,
        genre,
        description: formData.get("description"),
        epub_url: formData.get("read_url"),
      }),
    });

    const { error } = await res.json();

    setLoading(false);
    if (!error) {
      setSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    } else {
      alert("Error uploading: " + error.message);
    }
  };

  return (
    <main className="min-h-screen pb-16 font-inter" style={{ background: "#0b0b0f" }}>
      <Navbar />
      
      <div className="max-w-2xl mx-auto pt-32 px-6">
        <h1 className="font-bierika text-3xl mb-2 text-start" style={{ color: "#A47DAB" }}>Contribute to BookFlix</h1>
        <p className="text-[#b3b3b3] mb-10 text-start">Upload public domain or community content. Ensure every book is fully free for everyone.</p>

        {success ? (
          <div className="p-10 text-center rounded-lg" style={{ background: "rgba(164,125,171,0.1)", border: "1px solid #A47DAB" }}>
            <h2 className="text-xl mb-2" style={{ color: "#A47DAB" }}>Thank you!</h2>
            <p className="text-[#b3b3b3]">Your book has been submitted. Users will be able to read the full story once verified.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 text-start" style={{ color: "#666" }}>Book Title</label>
                <input name="title" required className="w-full bg-[#14141c] border border-white/10 rounded px-4 py-3 focus:border-[#A47DAB] outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 text-start" style={{ color: "#666" }}>Author</label>
                <input name="author" required className="w-full bg-[#14141c] border border-white/10 rounded px-4 py-3 focus:border-[#A47DAB] outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 text-start" style={{ color: "#666" }}>Reading Link (Direct ePub or PDF URL)</label>
              <input name="read_url" placeholder="https://example.com/book.epub" className="w-full bg-[#14141c] border border-white/10 rounded px-4 py-3 focus:border-[#A47DAB] outline-none transition-all" />
              <p className="mt-1.5 text-[10px] text-[#444] text-start">Provide a direct link to the book file for a "Full Read" experience.</p>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 text-start" style={{ color: "#666" }}>Genres (comma separated)</label>
              <input name="genre" placeholder="Classic, Mystery..." className="w-full bg-[#14141c] border border-white/10 rounded px-4 py-3 focus:border-[#A47DAB] outline-none transition-all" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2 text-start" style={{ color: "#666" }}>Description / Summary</label>
              <textarea name="description" rows={4} className="w-full bg-[#14141c] border border-white/10 rounded px-4 py-3 focus:border-[#A47DAB] outline-none transition-all" />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 rounded font-bold uppercase tracking-widest transition-all hover:brightness-110 active:scale-95 disabled:opacity-50"
                style={{ background: "linear-gradient(135deg, #A47DAB, #8a5f92)", color: "#fff" }}
              >
                {loading ? "Uploading..." : "Submit for Verification"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
