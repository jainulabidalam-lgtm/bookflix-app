import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

export async function GET() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json([]);

  const { data, error } = await supabase
    .from("reading_progress")
    .select(`
        book_id,
        progress,
        last_read,
        books:book_id (*)
    `)
    .eq("user_id", session.user.id)
    .order("last_read", { ascending: false })
    .limit(10);

  if (error || !data) return NextResponse.json([]);

  const results = data.map((item: any) => ({
    ...item.books,
    progress: item.progress,
    last_read: item.last_read
  })).filter(Boolean);

  return NextResponse.json(results);
}
