import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envFile = fs.readFileSync(path.resolve('.env.local'), 'utf-8');
const extractEnv = (key) => envFile.match(new RegExp(`${key}=(.*)`))?.[1]?.trim();

const SUPABASE_URL = extractEnv('NEXT_PUBLIC_SUPABASE_URL');
const SUPABASE_KEY = extractEnv('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function check() {
  const { data, error } = await supabase
    .from('books')
    .select('source');
    
  if (error) {
    console.error(error);
    return;
  }

  const counts = data.reduce((acc, curr) => {
    const src = curr.source || 'Original/Unknown';
    acc[src] = (acc[src] || 0) + 1;
    return acc;
  }, {});

  console.log("Current Database Breakdown:");
  console.table(counts);
}

check();
