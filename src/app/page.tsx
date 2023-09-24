'use client';
import React, { use, useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { useRouter } from 'next/navigation';
import { useStateContext } from '../../context/StateContext';
import Link from 'next/link';
import { useClient } from '../../lib/useClient';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const { state, setState } = useStateContext();
  const [loading, setLoading] = useState(true);

  const supabase = useClient();

  useEffect(() => {
    const { data: authListener } =
      supabase.auth.onAuthStateChange(handleAuthChange);
    // Simulate a delay for the loading animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      authListener.subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const handleAuthChange = async (event: any, session: any) => {
    if (event === 'SIGNED_IN' && session !== null) {
      console.log('session', event);
      localStorage.setItem('session', JSON.stringify(session));
      localStorage.setItem('user', JSON.stringify(session.user));
      setState({
        ...state,
        session,
        user: session.user,
      });

      window.location.href = '/Homepage';
    } else {
      console.log('no session');
    }
  };

  return (
    <div className="bg-gray-50 sm:px-6 lg:px-8 flex justify-center min-h-screen px-4 py-4">
      <div className="flex flex-col w-full max-w-md space-y-8">
        {loading ? (
          <div
            role="status"
            className="w-fit h-fit flex justify-center m-auto text-center align-middle">
            <svg
              aria-hidden="true"
              className="animate-spin fill-[#eed9d4] m-auto sm:w-[100px] sm:h-[100px] inline w-4 h-4 mr-2 text-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <React.Fragment>
            <div>
              <h2 className="mt-6 text-2xl font-extrabold text-center text-gray-900">
                Sign in to your account.
              </h2>
              <p className="mt-2 text-sm text-center text-gray-600">
                or{' '}
                <Link
                  href="https://downeystreetevents.com"
                  className="text-[#d98e48] hover:text-black hover:bg-transparent font-medium bg-transparent">
                  return to Downey Street Events website
                </Link>
              </p>
            </div>
            <Auth
              supabaseClient={supabase}
              appearance={{
                style: {
                  button: {
                    background: '#d98e48',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                  },
                  input: {
                    padding: '0.5rem 0.75rem',
                  },
                },
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: '',
                    password_label: '',
                    email_input_placeholder: 'Email address',
                    password_input_placeholder: 'Password',
                    button_label: 'Log in',
                  },
                  sign_up: {
                    link_text: '',
                  },
                },
              }}
              providers={[]}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default Page;
