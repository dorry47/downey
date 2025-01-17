'use client';
import React, { use, useEffect, useState } from 'react';
import { useClient } from '../../../lib/useClient';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAtom } from 'jotai';
import { globalStateAtom } from '../../../context/atoms';

type Props = {};

const Page = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);
  const [submitted, setSubmitted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const supabase = useClient();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      EMAIL: state.user?.email || '',
      PASSWORD: '',
    },
  });

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session: any) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setState({
            ...state,
            session,
            user: session.user,
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          });
        } else if (event === 'SIGNED_OUT') {
          setState({
            ...state,
            session: null,
            user: null,
            access_token: null,
            refresh_token: null,
          });
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log('state', state);
    const fetchUserData = async () => {
      if (state.user && state.user.email !== undefined) {
        console.log('state user', state.user);
        try {
          const { data, error } = await supabase
            .from('users')
            .select()
            .eq('email', state.user.email);
          if (data) {
            console.log('user data', data);

            setLoggedInUser(data[0]);
            setValue('EMAIL', data[0].email);
          } else {
            console.error(error);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [state]);

  const onSubmit = async (data: Record<string, any>) => {
    console.log('submitted', data);
    console.log('password', data.PASSWORD);

    // Update the user's password
    const { data: userUpdateData, error: updateError } =
      await supabase.auth.updateUser({
        password: data.PASSWORD,
      });

    if (updateError) {
      console.error(updateError);
      toast.error(updateError.message);
      return;
    } else {
      setSubmitted(true);
      console.log('Password updated successfully', userUpdateData);
    }
  };

  const onError = (errors: any) => {
    // your code here
    console.log('errors: ', errors);
  };

  useEffect(() => {
    if (submitted) {
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  }, [submitted]);

  return (
    <div className="bg-gray-50 sm:px-6 lg:px-8 flex w-full justify-center min-h-screen px-4 py-4">
      <div className="flex flex-col w-full max-w-2xl space-y-8">
        {!submitted ? (
          <section>
            <div>
              <h2 className="mt-6 text-2xl font-extrabold text-center text-gray-900">
                Set your password
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
            <form action="/login" onSubmit={handleSubmit(onSubmit, onError)}>
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label className="sr-only">Email</label>
                  <input
                    placeholder="Email Address"
                    className="rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none"
                    type="text"
                    disabled={watch('EMAIL') !== ''}
                    {...register('EMAIL', {
                      required: 'Email required.',
                    })}
                    id="EMAIL"
                  />
                </div>
                <div>
                  <label className="sr-only">Password</label>
                  <input
                    {...register('PASSWORD', {
                      required: 'Password required.',
                    })}
                    placeholder="Password"
                    className="rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none"
                    type="password"
                    id="PASSWORD"
                  />
                </div>
              </div>

              <div className="py-2">
                <input
                  type="submit"
                  name="commit"
                  value="Submit"
                  className="group bg-dse-gold hover:bg-dse-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md cursor-pointer"
                />{' '}
              </div>
            </form>
          </section>
        ) : (
          <div className="flex flex-col w-full max-w-md space-y-8">
            <h2 className="mt-6 text-2xl font-extrabold text-center text-gray-900">
              Password reset successful!
            </h2>
            <p className="text-md mt-2 text-center text-gray-600">
              Redirecting to Downey Street Events website
            </p>
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
          </div>
        )}
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
    </div>
  );
};

export default Page;
