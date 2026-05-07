import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { mode, title, author, description, genre, message, history } = await request.json();

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "AI service not configured" }, { status: 500 });
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (mode === 'summary') {
      systemPrompt = 'You are a literary expert. Provide a concise, 3-point summary of the book. Each point should be a bullet point starting with a dash (-).';
      userPrompt = `Provide a 3-point summary of "${title}" by ${author}. Genre: ${genre}. Description: ${description}.`;
    } else {
      systemPrompt = `You are a book expert assistant. You are helping a user who is currently reading "${title}" by ${author}. Genre: ${genre}. Answer their questions about characters, plot, or themes based on general knowledge of this book. Be helpful and insightful. Keep answers concise.`;
      userPrompt = message;
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      ...(history || []).slice(-4), // Keep last 4 messages for context
      { role: 'user', content: userPrompt }
    ];

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? 'Unable to process request.';
    return NextResponse.json({ content });
  } catch (err) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
