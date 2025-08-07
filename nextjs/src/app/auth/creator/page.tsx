// nextjs/src/app/auth/creator/page.tsx
'use client';

import React from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaTwitch } from 'react-icons/fa';

export default function CreatorAuthPage() {
  const supabase = createClient();
  const router = useRouter();

  const handleOAuthSignIn = async (provider: 'google' | 'twitch') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: provider,
      options: {
        redirectTo: `${location.origin}/creator-dashboard`
      }
    });

    if (error) {
      console.error('OAuth sign in error:', error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-6">Creator Sign In</h1>
        
        <button
          onClick={() => handleOAuthSignIn('google')}
          className="w-full flex items-center justify-center p-3 mb-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>

        <button
          onClick={() => handleOAuthSignIn('twitch')}
          className="w-full flex items-center justify-center p-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        >
          <FaTwitch className="mr-2" /> Sign in with Twitch
        </button>
      </div>
    </div>
  );
}
