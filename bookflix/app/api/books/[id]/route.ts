import { NextRequest, NextResponse } from 'next/server';
import { getServerBookById } from '@/app/lib/db-queries';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const book = await getServerBookById(id);
    
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    
    return NextResponse.json(book);
  } catch (e) {
    console.error("API Book Detail Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
