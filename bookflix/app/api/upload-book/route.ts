import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/app/lib/supabase/server';

export async function POST(request: NextRequest) {
  const { title, author, genre, description, epub_url } = await request.json();
  
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { error } = await supabase.from("books").insert({
    title,
    author,
    genre,
    description,
    epub_url,
    license_type: "Open Access",
    is_verified: false, 
    uploaded_by: session.user.id,
    source: "user"
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
