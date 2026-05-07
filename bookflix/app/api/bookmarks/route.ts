import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json([]);

  const { data, error } = await supabase
    .from("bookmarks")
    .select(`
        book_id,
        books:book_id (*)
    `)
    .eq("user_id", session.user.id)
    .order('created_at', { ascending: false });

  if (error || !data) return NextResponse.json([]);
  return NextResponse.json(data.map((item: any) => item.books).filter(Boolean));
}

export async function POST(request: NextRequest) {
  const { bookId } = await request.json();
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const { data: existing } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("book_id", bookId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("id", existing.id);
    return NextResponse.json({ bookmarked: false, error });
  } else {
    const { error } = await supabase
      .from("bookmarks")
      .insert({
        user_id: userId,
        book_id: bookId
      });
    return NextResponse.json({ bookmarked: true, error });
  }
}
