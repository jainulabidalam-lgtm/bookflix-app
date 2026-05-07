import { createClient } from './supabase/server';
import { MOCK_BOOKS, Book } from './mockData';
import axios from 'axios';

export async function getServerAllBooks(): Promise<Book[]> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("is_verified", true)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return MOCK_BOOKS;

    return (data as any[]).map(book => ({
      ...book,
      cover: book.cover_url || "/placeholder-cover.jpg",
      readUrl: book.epub_url || book.pdf_url || undefined,
      year: book.year || new Date(book.created_at).getFullYear(),
      source: book.source || "cc"
    })) as Book[];
  } catch (err) {
    return MOCK_BOOKS;
  }
}

export async function getServerBookById(id: string): Promise<Book | null> {
  const decodedId = decodeURIComponent(id);
  const supabase = await createClient();

  // 1. Open Library IDs
  if (decodedId.startsWith("/works/")) {
    try {
      const resp = await axios.get(`https://openlibrary.org${decodedId}.json`, { timeout: 3000 });
      const data = resp.data;
      
      let authorName = "Unknown Author";
      if (data.authors?.[0]?.author?.key) {
        try {
          const authResp = await axios.get(`https://openlibrary.org${data.authors[0].author.key}.json`, { timeout: 2000 });
          authorName = authResp.data.name || "Unknown Author";
        } catch(e) {}
      }

      // Identifier Resolution Logic
      let gutenbergId = data.id_project_gutenberg?.[0] || data.identifiers?.project_gutenberg?.[0];
      if (gutenbergId) gutenbergId = String(Number(gutenbergId));
      
      // Fallback: Check editions for Gutenberg ID
      if (!gutenbergId) {
        try {
          const editionsResp = await axios.get(`https://openlibrary.org${decodedId}/editions.json`, { 
            params: { limit: 100 },
            timeout: 3000 
          });
          const editions = editionsResp.data.entries || [];
          
          for (const ed of editions) {
            // Check direct property
            let gid = ed.id_project_gutenberg?.[0] || ed.identifiers?.project_gutenberg?.[0];
            
            // Check ocaid for Gutenberg signature (e.g. hardtimes00786gut)
            if (!gid && ed.ocaid && ed.ocaid.includes("gut")) {
              const match = ed.ocaid.match(/(\d+)/);
              if (match) gid = match[1];
            }

            if (gid) {
              gutenbergId = String(Number(gid));
              break;
            }
          }
        } catch (e) {
          console.warn("Editions fetch failed:", e);
        }
      }
      
      // Final sanitization of Gutenberg ID (it should be numeric)
      if (gutenbergId && !/^\d+$/.test(gutenbergId)) {
         const match = String(gutenbergId).match(/(\d+)/);
         if (match) gutenbergId = match[1];
      }

      // Find best edition for reading
      let editionKey = data.edition_key?.[0];
      
      // If no editionKey, fetch the editions to find one that is "readable"
      if (!editionKey) {
        try {
          const edResp = await axios.get(`https://openlibrary.org${decodedId}/editions.json`, { params: { limit: 1 } });
          editionKey = edResp.data.entries?.[0]?.key?.split('/').pop();
        } catch (e) {}
      }

      return {
        id: decodedId,
        title: data.title,
        author: authorName,
        description: typeof data.description === 'string' ? data.description : data.description?.value || "A global literary treasure.",
        cover: data.covers?.[0] ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg` : "/placeholder-cover.jpg",
        genre: data.subjects?.slice(0, 3) || ["Classic"],
        source: "cc",
        license_type: gutenbergId ? "Unabridged - Public Domain" : "Digital Stream",
        is_verified: true,
        year: data.first_publish_year || 0,
        readUrl: gutenbergId ? `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}-images.epub` : undefined,
        editionKey: editionKey,
        sampleText: !gutenbergId ? (typeof data.description === 'string' ? data.description : data.description?.value) : undefined
      } as any;
    } catch (e) {
      console.error("Open Library Server Fetch Error:", e);
      return null;
    }
  }

  // 2. Mock Data IDs (Support h1, m1, g1, etc.)
  const mockBook = MOCK_BOOKS.find(b => b.id === decodedId);
  if (mockBook) return mockBook;

  // 3. Database IDs
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("id", decodedId)
      .single();

    if (error || !data) {
      return MOCK_BOOKS.find(b => b.id === decodedId) || null;
    }

    const book = data as any;
    return {
      ...book,
      cover: book.cover_url || "/placeholder-cover.jpg",
      readUrl: book.epub_url || book.pdf_url || undefined,
      year: book.year || new Date(book.created_at).getFullYear(),
      source: book.source || "cc"
    } as Book;
  } catch (e) {
    return MOCK_BOOKS.find(b => b.id === decodedId) || null;
  }
}

export async function getServerBooksByGenre(genre: string): Promise<Book[]> {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .contains("genre", [genre])
      .eq("is_verified", true)
      .limit(20);

    if (error || !data || data.length === 0) {
      return MOCK_BOOKS.filter(b => b.genre.includes(genre));
    }

    return (data as any[]).map(book => ({
      ...book,
      cover: book.cover_url || "/placeholder-cover.jpg",
      readUrl: book.epub_url || book.pdf_url || undefined,
      year: book.year || new Date(book.created_at).getFullYear(),
      source: book.source || "cc"
    })) as Book[];
  } catch (e) {
    return MOCK_BOOKS.filter(b => b.genre.includes(genre));
  }
}
