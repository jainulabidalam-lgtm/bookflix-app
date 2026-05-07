import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envFile = fs.readFileSync(path.resolve('.env.local'), 'utf-8');
const extractEnv = (key) => envFile.match(new RegExp(`${key}=(.*)`))?.[1]?.trim();

const SUPABASE_URL = extractEnv('NEXT_PUBLIC_SUPABASE_URL');
const SUPABASE_KEY = extractEnv('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function clean() {
  console.log("Stopping all background noise and cleaning DB...");
  const { error } = await supabase
    .from('books')
    .delete()
    .in('source', ['openlibrary', 'gutenberg']);
    
  if (error) {
     console.error("Cleanup Failed:", error);
  } else {
     console.log("Success! Only your original books remain.");
  }
}

clean();
