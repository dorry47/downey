'use client';
import React, { use, useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { useRouter } from 'next/navigation';
import { useStateContext } from '../../context/StateContext';
import Link from 'next/link';
import { useClient } from '../../lib/useClient';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const { state, setState } = useStateContext();
  const [loading, setLoading] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

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

  const forgotPasswordFunction = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(
      forgotPasswordEmail,
      {
        redirectTo: 'http://localhost:3000/update-password',
      }
    );
    if (error) {
      console.log(error);
      toast.error(error.message);
    } else {
      console.log('email sent');
      setEmailSent(true);
    }
  };

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

      console.log('session', session);

      if (session != null) {
        window.location.href = '/Homepage';
      }
    } else {
      console.log('no session');
    }
  };

  return (
    <div className="bg-gray-50 sm:px-6 lg:px-8 flex justify-center min-h-screen px-4 py-4">
      <div className="flex flex-col w-full max-w-md space-y-8">
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
          {!forgotPassword ? (
            <>
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
                    forgotten_password: {
                      link_text: '',
                    },
                  },
                }}
                providers={[]}
              />
              <button
                type="button"
                onClick={() => {
                  setForgotPassword(true);
                }}
                className="!mt-0 underline">
                Forgot Password
              </button>
            </>
          ) : (
            <>
              {!emailSent ? (
                <>
                  <input
                    onChange={(e) => {
                      setForgotPasswordEmail(e.target.value);
                    }}
                    type="email"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      forgotPasswordFunction();
                    }}
                    style={{
                      background: '#d98e48',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.375rem',
                    }}>
                    Send Password Reset Instructions
                  </button>
                </>
              ) : (
                <p className="m-auto font-bold">
                  Check your email for password reset instructions.
                </p>
              )}
            </>
          )}
        </React.Fragment>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Page;
