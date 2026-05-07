"use client";

import { useState, useRef, useEffect } from "react";
import { Book } from "../lib/mockData";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIExplanationProps {
  book: Book;
}

export default function AIExplanation({ book }: AIExplanationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'summary' | 'chat'>('summary');
  const [summary, setSummary] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm your BookFlix Assistant. I can summarize this book or answer any questions you have about it. How can I help?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (mode === 'chat') scrollToBottom();
  }, [messages, loading]);

  const fetchSummary = async () => {
    if (summary || !book) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: 'summary',
          title: book.title,
          author: book.author,
          description: book.description,
          genre: book.genre?.join(", ") || "General",
        }),
      });
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      setSummary(data.content || "Unable to generate summary.");
    } catch (err) {
      setSummary("Sorry, the AI service is temporarily unavailable. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || loading || !book) return;

    const userMsg = inputValue.trim();
    setInputValue("");
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: 'chat',
          title: book.title,
          author: book.author,
          genre: book.genre?.join(", ") || "General",
          message: userMsg,
          history: messages.slice(-6), // Send last few messages for context
        }),
      });
      if (!res.ok) throw new Error("API Error");
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.content || "I'm having trouble thinking right now." }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: "I'm sorry, I couldn't reach the literary brain. Please try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && mode === 'summary') {
      fetchSummary();
    }
  };

  return (
    <div className="fixed bottom-[24px] right-[80px] z-[999998] font-inter">
      {/* Floating Button */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 bg-[#A47DAB] hover:bg-[#8a5f92] text-white rounded-full px-4 py-2 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group"
        style={{ boxShadow: "0 8px 32px rgba(164, 125, 171, 0.4)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:rotate-12 transition-transform">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <span className="text-[12px] font-bold uppercase tracking-widest">AI Assistant</span>
      </button>

      {/* AI Box */}
      {isOpen && (
        <div 
          className="absolute bottom-14 right-0 w-[350px] md:w-[400px] bg-[#0b0b0f] border border-[#A47DAB44] rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300"
          style={{ height: "500px", boxShadow: "0 20px 50px rgba(0,0,0,0.8)" }}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#A47DAB22] bg-[#A47DAB11] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#A47DAB] rounded-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[11px] font-bold text-[#A47DAB] uppercase tracking-widest leading-none">Book Assistant</h3>
                <div className="flex gap-3 mt-2">
                  <button 
                    onClick={() => { setMode('summary'); fetchSummary(); }}
                    className={`text-[9px] uppercase tracking-wider font-bold transition-colors ${mode === 'summary' ? 'text-white' : 'text-[#666] hover:text-[#999]'}`}
                  >
                    Summary
                  </button>
                  <button 
                    onClick={() => setMode('chat')}
                    className={`text-[9px] uppercase tracking-wider font-bold transition-colors ${mode === 'chat' ? 'text-white' : 'text-[#666] hover:text-[#999]'}`}
                  >
                    Chat (Q&A)
                  </button>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#666] hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-grow overflow-y-auto p-5 custom-scrollbar bg-gradient-to-b from-[#0b0b0f] to-[#08080c]">
            {mode === 'summary' ? (
              <div className="space-y-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#666] font-bold">3-Point Summary</p>
                {loading && !summary ? (
                  <div className="py-10 flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-[#A47DAB] border-t-transparent rounded-full animate-spin" />
                    <p className="text-[10px] text-[#A47DAB] animate-pulse uppercase tracking-widest font-bold">Synthesizing...</p>
                  </div>
                ) : (
                  <div className="bg-[#14141c] border border-[#A47DAB11] rounded-xl p-5">
                    <div className="text-sm leading-relaxed text-[#d1d1d1] whitespace-pre-line font-serif">
                      {summary}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {messages.length === 0 && (
                  <div className="py-10 text-center">
                    <p className="text-xs text-[#555] italic">Ask me anything about characters, plot, or themes in "{book.title}"</p>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${m.role === 'user' ? 'bg-[#A47DAB] text-white rounded-tr-none' : 'bg-[#1a1a24] text-[#d1d1d1] rounded-tl-none border border-white/5'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-[#1a1a24] px-4 py-3 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                      <div className="w-1.5 h-1.5 bg-[#A47DAB] rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-[#A47DAB] rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-[#A47DAB] rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Footer / Input Area */}
          {mode === 'chat' && (
            <form onSubmit={handleSendMessage} className="p-4 bg-[#08080c] border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about the book..." 
                className="flex-grow bg-[#14141c] border border-white/5 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-[#A47DAB44] transition-colors"
              />
              <button 
                type="submit" 
                disabled={!inputValue.trim() || loading}
                className="p-2 bg-[#A47DAB] text-white rounded-full disabled:opacity-50 disabled:grayscale transition-all hover:scale-105 active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </form>
          )}
          {mode === 'summary' && (
            <div className="px-5 py-3 bg-[#08080c] border-t border-white/5 text-center">
              <p className="text-[9px] text-[#444] tracking-wider uppercase font-medium">Real-time literary analysis</p>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #A47DAB22; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #A47DAB44; }
      `}</style>
    </div>
  );
}
