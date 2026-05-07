import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import { getServerAllBooks } from '@/app/lib/db-queries';
import HomeContent from '@/app/HomeContent';

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const books = await getServerAllBooks();
  return <HomeContent initialBooks={books} />;
}
