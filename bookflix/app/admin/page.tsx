"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { supabase } from "@/app/lib/supabase";

export default function AdminPage() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [pendingBooks, setPendingBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      // Basic security check to ensure they are logged in via Google OAuth
      const { data: { session } }: any = await supabase.auth.getSession();
      
      if (!session) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      
      setIsAdmin(true);

      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("is_verified", false)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPendingBooks(data);
      }
      setLoading(false);
    };

    checkAuthAndFetch();
  }, []);

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from("books")
      .update({ is_verified: true })
      .eq("id", id);
      
    if (!error) {
      setPendingBooks(prev => prev.filter(b => b.id !== id));
    } else {
      alert("Error approving book: " + error.message);
    }
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from("books")
      .delete()
      .eq("id", id);
      
    if (!error) {
      setPendingBooks(prev => prev.filter(b => b.id !== id));
    } else {
      alert("Error deleting book: " + error.message);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: "#0b0b0f" }}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#A47DAB]"></div>
      </main>
    );
  }

  if (isAdmin === false) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center font-inter px-6" style={{ background: "#0b0b0f" }}>
        <h1 className="text-3xl font-bierika mb-4 text-[#A47DAB]">Access Denied</h1>
        <p className="text-[#b3b3b3] mb-6">You must be signed in to view the admin gateway.</p>
        <button onClick={() => router.push("/")} className="px-6 py-2 border border-[#333] hover:border-[#A47DAB] text-white rounded transition-colors text-sm">
          Return Home
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-16 font-inter text-white" style={{ background: "#0b0b0f" }}>
      <Navbar />
      
      <div className="max-w-6xl mx-auto pt-32 px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-bierika text-3xl mb-1" style={{ color: "#A47DAB" }}>Admin Dashboard</h1>
            <p className="text-sm" style={{ color: "#b3b3b3" }}>Review pending community uploads.</p>
          </div>
          <div className="bg-[#14141c] px-4 py-2 border border-white/10 rounded">
            <span className="text-xs tracking-widest uppercase" style={{ color: "#A47DAB" }}>Pending: </span>
            <span className="font-bold">{pendingBooks.length}</span>
          </div>
        </div>

        {pendingBooks.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-lg bg-[#14141c]">
            <p className="text-[#b3b3b3]">No pending books waiting for approval.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs tracking-widest uppercase text-[#666]">
                  <th className="pb-3 px-4 font-normal">Book Details</th>
                  <th className="pb-3 px-4 font-normal w-[20%]">Source Link</th>
                  <th className="pb-3 px-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {pendingBooks.map((book) => (
                  <tr key={book.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-5 px-4 min-w-[300px]">
                      <p className="font-bold text-base mb-1" style={{ color: "#A47DAB" }}>{book.title}</p>
                      <p className="text-[#b3b3b3] text-xs">By {book.author} • {book.genre?.join(", ")}</p>
                      {book.description && (
                        <p className="text-[#888] mt-2 text-xs line-clamp-2 pr-8">{book.description}</p>
                      )}
                    </td>
                    <td className="py-5 px-4 align-top pt-6">
                      {book.epub_url ? (
                         <a href={book.epub_url} target="_blank" rel="noreferrer" className="text-xs underline text-blue-400 hover:text-blue-300">
                           View EPUB/PDF
                         </a>
                      ) : (
                         <span className="text-xs text-[#555]">No link provided</span>
                      )}
                    </td>
                    <td className="py-5 px-4 align-top pt-5 text-right w-[200px]">
                      <div className="flex flex-col gap-2 items-end">
                        <button 
                          onClick={() => handleApprove(book.id)}
                          className="w-24 py-1.5 text-xs font-bold rounded bg-green-900/40 text-green-400 border border-green-500/50 hover:bg-green-700/60 transition-colors"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleReject(book.id)}
                          className="w-24 py-1.5 text-xs rounded bg-red-900/20 text-red-400 border border-red-900 hover:bg-red-900/50 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
