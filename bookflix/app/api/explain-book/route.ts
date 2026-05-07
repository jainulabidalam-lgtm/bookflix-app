import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting (Note: In production usage, use Redis or similar)
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > RATE_LIMIT_WINDOW) {
    userData.count = 1;
    userData.lastReset = now;
    rateLimitMap.set(ip, userData);
    return false;
  }

  userData.count++;
  rateLimitMap.set(ip, userData);
  return userData.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  try {
    // SECURITY AUDIT FIX: Simple Rate Limit check
    const ip = request.headers.get('x-forwarded-for') || 'anonymous';
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }

    const { title, author, description, genre } = await request.json();

    // SECURITY AUDIT FIX: Key must be server-side only
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY is missing in environment");
      return NextResponse.json({ error: "AI service not configured" }, { status: 500 });
    }

    // Domain validation of input? (Optional, but let's stick to the basics)
    if (!title || !author) {
      return NextResponse.json({ error: "Missing book details" }, { status: 400 });
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are a book expert. Give short, engaging book explanations. Use a friendly, inviting tone. Focus on why it is worth reading.'
          },
          {
            role: 'user',
            content: `Explain "${title}" by ${author}. Genre: ${genre}. Description: ${description}. What is it about, why people love it, who should read it. Max 150 words.`
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Groq API error:", errorData);
      return NextResponse.json({ error: "Failed to generate AI insight" }, { status: res.status });
    }

    const data = await res.json();
    const explanation = data.choices?.[0]?.message?.content ?? 'Could not generate explanation.';
    return NextResponse.json({ explanation });
  } catch (err) {
    console.error("AI Explanation error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
