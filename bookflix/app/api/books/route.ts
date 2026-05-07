import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';
import { MOCK_BOOKS } from '@/app/lib/mockData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre');
  const limit = parseInt(searchParams.get('limit') || '10');

  const supabase = await createClient();

  try {
    let query = supabase
      .from("books")
      .select("*")
      .eq("is_verified", true);

    if (genre) {
      query = query.contains("genre", [genre]);
    }

    const { data, error } = await query
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.warn("DB Fetch Error, falling back to mocks:", error);
      return NextResponse.json(genre ? MOCK_BOOKS.filter(b => b.genre.includes(genre)) : MOCK_BOOKS);
    }

    // MERGE MOCKS WITH DB DATA to ensure partitions always show
    const dbBooks = (data || []).map(book => ({
      ...book,
      cover: book.cover_url || "/placeholder-cover.jpg",
      readUrl: book.epub_url || book.pdf_url || undefined,
      year: book.year || new Date(book.created_at).getFullYear(),
      source: book.source || "cc"
    }));

    const combinedBooks = [...MOCK_BOOKS, ...dbBooks];
    return NextResponse.json(combinedBooks);
  } catch (err) {
    console.error("API Books error:", err);
    return NextResponse.json(MOCK_BOOKS);
  }
}
