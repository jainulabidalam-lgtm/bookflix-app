import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, author } = await request.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ story: "Archive error: GROQ_API_KEY is not configured. Please add it to .env.local to enable Full Story Sync." });
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: `You are a universal digital librarian. Your task is to provide the WHOLE opening chapter of the book requested. 
            Rules:
            1. Output ONLY the story text.
            2. Make it at least 1500 words long for a "whole story" feel.
            3. DETECTION: If the title/author is Hindi (e.g., Yama, Gondan), you MUST output the story in HINDI. If German, output in GERMAN.
            4. Style: Premium, immersive, and unabridged narration.`
          },
          {
            role: 'user',
            content: `Sync and stream the whole unabridged opening of "${title}" by ${author}.`
          }
        ],
        max_tokens: 500,
        temperature: 0.8
      })
    });

    const data = await res.json();
    
    if (data.error) {
       if (data.error.code === "rate_limit_exceeded") {
          return NextResponse.json({ story: "The digital archive is busy synchronizing other stories. Please wait 15 seconds for the next chapter to load." });
       }
       return NextResponse.json({ story: `Sync Error: ${data.error.message}` });
    }

    const story = data.choices?.[0]?.message?.content;
    
    if (!story) {
       return NextResponse.json({ story: "The digital archive for this title is currently under high load. Please try again in a moment." });
    }

    return NextResponse.json({ story });
  } catch (err: any) {
    console.error("Story Sync Crash:", err);
    return NextResponse.json({ story: "Critical Link Error: Unable to reach the synchronization server. Ensure your internet connection is active." });
  }
}
