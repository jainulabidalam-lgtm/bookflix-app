import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import LoginContent from './LoginContent';

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (user) {
    redirect('/home');
  }

  return <LoginContent />;
}
