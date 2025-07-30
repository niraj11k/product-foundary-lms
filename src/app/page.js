import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Header from '@/components/Header';
import AuthPage from '@/components/AuthPage';
import Dashboard from '@/components/Dashboard';

export default async function Home() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const { data: { user } = {} } = await supabase.auth.getUser();

  return (
    <div>
      <Header user={user} />
      <main className="p-4 sm:p-6 md:p-8">
        {!user ? <AuthPage /> : <Dashboard user={user} />}
      </main>
    </div>
  );
}