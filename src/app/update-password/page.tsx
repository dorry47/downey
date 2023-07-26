'use client';
import { Auth } from '@supabase/auth-ui-react';
import React, { use, useEffect } from 'react';
import { useClient } from '../../../lib/useClient';
import { useStateContext } from '../../../context/StateContext';
import { useForm } from 'react-hook-form';

type Props = {};

const page = (props: Props) => {
  const { state, setState } = useStateContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      EMAIL: state.user?.email || '',
      PASSWORD: '',
    },
  });

  useEffect(() => {
    const supabase = useClient();

    const { data: authListener } =
      supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   // read the url parameters and get the value from email=
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const email = urlParams.get('email');
  // }, []);

  const handleAuthChange = async (event: any, session: any) => {
    if (
      (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') &&
      session !== null
    ) {
      console.log('signed in', session);
      localStorage.setItem('session', JSON.stringify(session));
      localStorage.setItem('user', JSON.stringify(session.user));
      setState({
        ...state,
        session,
        user: session.user,
      });
      // router.push('/Homepage');
    } else {
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user') as string);
    const savedSession = JSON.parse(localStorage.getItem('session') as string);
    if (savedUser && savedSession) {
      setState({
        ...state,
        user: savedUser,
        session: savedSession,
      });
    }
  }, []);

  useEffect(() => {
    console.log('session', state.session);
    console.log('user', state.user);
  }, [state]);

  const onSubmit = async (data: Record<string, any>) => {
    console.log('submitted', data);
    console.log('password', data.PASSWORD);

    const supabase = useClient();

    const { data: user, error } = await supabase.auth.getUser(data.EMAIL);
    if (error) {
      console.error(error);
      return;
    }

    const { data: nonce } = await supabase.auth.reauthenticate();

    if (user) {
      const { error, data: updatedData } = await supabase.auth.updateUser({
        email: data.EMAIL,
        password: data.PASSWORD,
        nonce: nonce.session?.access_token,
      });
      if (error) {
        console.log('updatedData', updatedData);

        console.error(error);
        return;
      }
    } else {
      console.error('User not found');
      return;
    }

    // fetch('/api/newClient', {
    //   method: 'POST',
    //   body: JSON.stringify(data),

    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('returned data', data);
    //   });

    // window.scrollTo(0, 0);
  };

  const onError = (errors: any) => {
    // your code here
    console.log('errors: ', errors);
  };
  return (
    <div className="bg-gray-50 sm:px-6 lg:px-8 flex justify-center min-h-screen px-4 py-4">
      <div className="flex flex-col w-full max-w-md space-y-8">
        <React.Fragment>
          <div>
            <h2 className="mt-6 text-2xl font-extrabold text-center text-gray-900">
              Reset your password
            </h2>
            <p className="mt-2 text-sm text-center text-gray-600">
              or{' '}
              <a
                href="https://downeystreetevents.com"
                className="text-[#d98e48] hover:text-black hover:bg-transparent font-medium bg-transparent">
                return to Downey Street Events website
              </a>
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
                value="Reset"
                className="group bg-dse-gold hover:bg-dse-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md cursor-pointer"
              />{' '}
            </div>
          </form>
        </React.Fragment>
      </div>
    </div>
  );
};

export default page;
