// nextjs/src/app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  // A simple log to confirm the user is authenticated on the server side
  console.log(`User ${user.id} accessed the dashboard.`);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Rights Holder Dashboard</h1>
        <p className="text-xl text-gray-700">Welcome, {user.email}!</p>
        <p className="mt-4 text-gray-500">This is a protected page.</p>
      </div>
    </div>
  );
}
