import { Book } from "./mockData";

export async function getAllBooks(): Promise<Book[]> {
  try {
    const res = await fetch("/api/books");
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Fetch Books Error:", e);
    return [];
  }
}

// Client-side memory cache for instant loading
const bookCache: Record<string, Book> = {};

export async function getBookById(id: string): Promise<Book | null> {
  // 1. Check Memory Cache First (Instant)
  if (bookCache[id]) return bookCache[id];

  // 2. Check Mock Data (Instant Fallback)
  const { MOCK_BOOKS } = require("./mockData");
  const mockBook = MOCK_BOOKS.find((b: Book) => b.id === id);
  if (mockBook) {
    bookCache[id] = mockBook;
    return mockBook;
  }

  // 3. Network Fetch with 2s Timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    
    const res = await fetch(`/api/books/${encodeURIComponent(id)}`, { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (res.ok) {
      const data = await res.json();
      if (data) {
        bookCache[id] = data;
        return data;
      }
    }
  } catch (e) {
    console.error("Fetch Book Error or Timeout:", e);
  }
  
  return null;
}

export async function getBooksByGenre(genre: string): Promise<Book[]> {
  try {
    const res = await fetch(`/api/books?genre=${encodeURIComponent(genre)}`);
    if (!res.ok) return [];
    return await res.json();
  } catch (e) {
    console.error("Fetch Books By Genre Error:", e);
    return [];
  }
}

export function getSimilarBooks(book: Book): Book[] {
  // Use MOCK_BOOKS for similarity comparison
  const { MOCK_BOOKS } = require("./mockData");
  return MOCK_BOOKS.filter(
    (b: Book) => b.id !== book.id && b.genre.some((g: string) => book.genre.includes(g))
  ).slice(0, 6);
}
