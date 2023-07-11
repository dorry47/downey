'use client';
import React, { useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { useStateContext } from '../../context/StateContext';

type Props = {};

const page = (props: Props) => {
  const router = useRouter();
  const { state, setState } = useStateContext();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  useEffect(() => {
    const { data: authListener } =
      supabase.auth.onAuthStateChange(handleAuthChange);

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleAuthChange = async (event: any, session: any) => {
    if (event === 'SIGNED_IN' && session !== null) {
      // set to local storage
      localStorage.setItem('session', JSON.stringify(session));
      localStorage.setItem('user', JSON.stringify(session.user));
      setState({
        session,
        user: session.user,
      });
      router.push('/homepage');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="bg-gray-50 sm:px-6 lg:px-8 flex justify-center min-h-screen px-4 py-4">
      <div className="w-full max-w-md space-y-8">
        <Auth supabaseClient={supabase} providers={[]} />
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
            Sign in to your planner account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            or {` `}
            <a
              href="https://downeystreetevents.com"
              className="text-[#d98e48] hover:text-black hover:bg-transparent font-medium bg-transparent">
              return to Downey Street Events website
            </a>
          </p>
        </div>
        <form action="/login" acceptCharset="UTF-8" method="post">
          <input
            type="hidden"
            name="authenticity_token"
            value="TMOed_hpfJAICDVmbHNiUQ7nQVJt5Zl-Qj9Eubtq--srZVYFITOFOVaQg_yBqX55p3PsfBflSyxv2h1hegtn3Q"></input>

          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label className="sr-only">Email</label>
              <input
                placeholder="email address"
                className="rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none"
                type="text"
                name="login[email]"
                id="login_email"></input>
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                placeholder="password"
                className="rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none"
                type="password"
                name="login[password]"
                id="login_password"></input>
            </div>
          </div>

          <div className="py-2">
            <input
              type="submit"
              name="commit"
              value="Log In"
              className=" bg-[#d98e48] hover:bg-[#db6035] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md cursor-pointer"
              data-disable-with="Log In"></input>{' '}
          </div>
        </form>{' '}
      </div>
    </div>
  );
};

export default page;
