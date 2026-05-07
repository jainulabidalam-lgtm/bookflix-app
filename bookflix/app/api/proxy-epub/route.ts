import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // SECURITY AUDIT FIX: Restrict to specific trusted domains as requested
  const ALLOWED_DOMAINS = [
    'gutenberg.org', 
    'archive.org', 
    'standardebooks.org', 
    'openlibrary.org', 
    'supabase.co',
    'supabase.in',
    'googleusercontent.com'
  ];
  
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();
    
    const isAllowed = ALLOWED_DOMAINS.some(d => hostname === d || hostname.endsWith('.' + d));
    
    if (!isAllowed) {
      console.warn(`Blocked proxy request to unauthorized domain: ${hostname}`);
      return NextResponse.json({ 
        error: `Forbidden: Domain '${hostname}' not in whitelist. Only trusted book sources allowed.` 
      }, { status: 403 });
    }
  } catch (e) {
    return NextResponse.json({ error: 'Invalid URL source' }, { status: 400 });
  }

  console.log(`Proxying book request: ${url}`);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'BookFlix-Secure-Proxy/1.0'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: `Failed to fetch book: ${response.statusText}` }, { status: response.status });
    }

    const buffer = await response.arrayBuffer();
    const headers = new Headers();
    
    headers.set('Content-Type', response.headers.get('Content-Type') || 'application/epub+zip');
    headers.set('Access-Control-Allow-Origin', '*'); 
    headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours

    return new NextResponse(buffer, {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("Secure Proxy Error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
