import { NextRequest, NextResponse } from 'next/server';
import axios from "axios";
import type { Book } from "@/app/lib/mockData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const response = await axios.get(`https://openlibrary.org/search.json`, {
      params: {
        q: query,
        limit: 100, 
      },
    });

    const docs = response.data.docs;
    const mappedBooks: Book[] = docs.map((doc: any, index: number) => {
      const coverId = doc.cover_i;
      
      let gid = doc.id_project_gutenberg?.[0];
      if (!gid && doc.ocaid) {
         const ocaid: string = Array.isArray(doc.ocaid) ? doc.ocaid[0] : doc.ocaid;
         if (ocaid.includes("gut")) {
            const match = ocaid.match(/(\d+)/);
            if (match) gid = String(Number(match[1]));
         }
      } else if (gid) {
         gid = String(Number(gid));
      }
      
      return {
        id: doc.key || String(index),
        title: doc.title,
        author: doc.author_name?.[0] || "Unknown Author",
        description: doc.first_sentence?.[0] || `A work about ${query}.`,
        cover: coverId 
          ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` 
          : "https://images.unsplash.com/photo-1543005128-d143431aa57b?auto=format&fit=crop&q=80&w=400", 
        readUrl: gid ? `https://www.gutenberg.org/cache/epub/${gid}/pg${gid}-images.epub` : undefined,
        editionKey: doc.edition_key?.[0], // Capture best edition for embedding
        sampleText: !gid ? (doc.first_sentence?.[0] || `Summary: ${doc.title} by ${doc.author_name?.[0]}. A literary masterpiece in the ${doc.subject?.[0]} genre.`) : undefined,
        genre: doc.subject?.slice(0, 3) || ["Classic"],
        source: gid ? "gutenberg" : "cc",
        license_type: gid ? "Unabridged - Public Domain" : "Digital Access",
        is_verified: true,
        year: doc.first_publish_year || 0,
      };
    });

    return NextResponse.json(mappedBooks);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
