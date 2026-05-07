import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bookId = searchParams.get('bookId');
  if (!bookId) return NextResponse.json({ error: "Missing bookId" }, { status: 400 });

  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("reading_progress")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("book_id", bookId)
    .single();

  if (error) return NextResponse.json(null);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const { bookId, progress, lastPosition } = await request.json();
  
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase
    .from("reading_progress")
    .upsert({
      user_id: session.user.id,
      book_id: bookId,
      progress,
      last_position: lastPosition,
      last_read: new Date().toISOString()
    }, {
      onConflict: "user_id,book_id"
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
