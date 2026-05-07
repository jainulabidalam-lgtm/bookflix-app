import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envFile = fs.readFileSync(path.resolve('.env.local'), 'utf-8');
const extractEnv = (key) => envFile.match(new RegExp(`${key}=(.*)`))?.[1]?.trim();

const SUPABASE_URL = extractEnv('NEXT_PUBLIC_SUPABASE_URL');
const SUPABASE_KEY = extractEnv('SUPABASE_SERVICE_ROLE_KEY');

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const GENRES = [
  "horror", "romance", "fantasy", "adventure", "science fiction", 
  "mystery", "thriller", "classic", "young adult", "mythology", 
  "history", "biography", "poetry", "gothic", 
  "humor", "western", "drama", "philosophy", "science"
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function seed() {
  console.log("🚀 Starting Permanent High-Quality Seed (Gutenberg)...");

  for (const genre of GENRES) {
    console.log(`\n📚 Topic: ${genre.toUpperCase()}`);
    
    for (let page = 1; page <= 10; page++) {
      try {
        const response = await fetch(`https://gutendex.com/books/?topic=${encodeURIComponent(genre)}&page=${page}`);
        
        if (!response.ok) {
           console.log(`Rate Limited. Resting 5s...`);
           await sleep(5000);
           break;
        }

        const data = await response.json();
        if (!data.results || data.results.length === 0) break;

        const books = data.results
          .filter(work => work.formats && work.formats["application/epub+zip"])
          .map(work => ({
            title: work.title || "Untitled",
            author: work.authors && work.authors.length > 0 ? work.authors[0].name.split(", ").reverse().join(" ") : "Unknown Author",
            description: null,
            genre: [genre.charAt(0).toUpperCase() + genre.slice(1)],
            cover_url: work.formats["image/jpeg"] || null,
            epub_url: work.formats["application/epub+zip"],
            read_url: `https://www.gutenberg.org/ebooks/${work.id}`,
            is_verified: true, // Auto-approve per user request
            source: 'gutenberg'
          }));

        if (books.length > 0) {
          const { error } = await supabase.from('books').upsert(books, { onConflict: 'title,author' });
          if (error) {
            console.error(`[!] Upsert Error:`, error.message);
          } else {
            console.log(`   ✓ Page ${page}: Upserted ${books.length} verified books.`);
          }
        }

        await sleep(500);
      } catch (err) {
        console.error(`Error on Page ${page}:`, err.message);
        await sleep(2000);
      }
    }
  }
  console.log("\n✨ PERMANENT DB SEED COMPLETE ✨");
}

seed();
