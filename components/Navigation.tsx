'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useClient } from '../lib/useClient';
import { useAtom } from 'jotai';
import { globalStateAtom } from '../context/atoms';

const Navigation = () => {
  const [state, setState] = useAtom(globalStateAtom);
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const [loggedInUser, setLoggedInUser] = React.useState<any>(null);
  const slug = loggedInUser?.name;
  const plannerSlug = slug?.replace(/\s+/g, '-').toLowerCase();
  const clientSlug = loggedInUser?.name.replace(' + ', '-');
  const pathSlug = path.split('/clients/')[1];
  console.log('path slug', pathSlug);

  const role = loggedInUser?.role;
  console.log('path', path);

  const supabase = useClient();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Component has mounted, set isClient to true
    setIsClient(true);
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();

      setState({
        session: null,
        user: null,
        showMobileMenu: false,
        loggedInUser: null,
        refresh_token: null,
        access_token: null,
      });

      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const checkLoggedInUser = async () => {
    if (state.user != null) {
      await supabase
        .from('users')
        .select('*')
        .eq('email', state.user.email)
        .then((data: any) => {
          console.log('signed in user', data?.data[0]);
          const formattedName = data?.data[0]?.name.replace(/[ +]+/g, '-');
          console.log('formatted name', formattedName);
          setLoggedInUser(data.data[0]);
          setState({ ...state, loggedInUser: data?.data[0] });

          if (
            formattedName != pathSlug &&
            role == 'client' &&
            state.session != null
          ) {
            console.log('redirecting to', `/clients/${formattedName}`);
            // If not, redirect the user to their own portal
            router.push(`/clients/new?edit=${formattedName}`);
          }
        });
    }
  };

  useEffect(() => {
    checkLoggedInUser();
  }, [state.user]);

  useEffect(() => {
    console.log('path slug', pathSlug);
    console.log('client slug', clientSlug);
    if (
      clientSlug != undefined &&
      pathSlug != undefined &&
      pathSlug != 'Lucy-Kevin' &&
      clientSlug != pathSlug &&
      pathSlug != 'new' &&
      role == 'client'
    ) {
      router.push(`/clients/${clientSlug}`);
    }
  }, [clientSlug]);

  console.log('state', state);
  return (
    isClient && (
      <nav className="bg-[#eed9d4]  relative h-12 md:h-16 w-full text-xl px-[2rem]">
        <div className="md:flex max-w-7xl items-center justify-between hidden h-full m-auto">
          <div className="flex items-baseline flex-1 space-x-1">
            {role != 'client' && state.session != null && path !== '/' && (
              <div>
                <Link
                  className="text-[rgba(219,96,53)] px-3 uppercase text-[.5rem] tracking-[.2em] lg:tracking-[.3em]  font-normal"
                  href="/clients/new">
                  + New Client
                </Link>
                <Link
                  className="text-black px-3 uppercase text-[.5rem] tracking-[.2em] lg:tracking-[.3em]  font-normal"
                  href="/Homepage">
                  Clients
                </Link>
                <Link
                  className="text-black px-3 uppercase text-[.5rem] tracking-[.2em] lg:tracking-[.3em] font-normal"
                  href="/planners">
                  Planners
                </Link>
              </div>
            )}
          </div>
          <div className=" lg:w-96 flex justify-center flex-shrink-0 w-1/4 h-full m-auto">
            <Link
              className="relative w-full h-full m-auto"
              onClick={() => {
                if (pathSlug != 'Lucy-Kevin') {
                  router.back();
                }
              }}
              href={
                role == 'client'
                  ? `/clients/${clientSlug}`
                  : state.session != null
                  ? `/Homepage`
                  : ''
              }>
              <Image
                priority
                className="p-2"
                src="/images/DSE-Logo.svg"
                alt="DSE Logo"
                fill
              />
            </Link>
          </div>
          <div className="flex justify-end flex-1">
            {state.session != null && path !== '/' && (
              <div>
                <Link
                  className="text-black px-3 uppercase text-[.5rem] tracking-[.3em] font-normal"
                  href={` ${
                    role == 'client'
                      ? `/clients/${clientSlug}`
                      : `/planners/edit/${plannerSlug}`
                  }`}>
                  Hi {loggedInUser && loggedInUser.name}
                </Link>{' '}
                <button
                  className="text-black px-3 uppercase text-[.5rem] tracking-[.3em] font-normal"
                  rel="nofollow"
                  onClick={() => {
                    handleSignOut();
                  }}>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden relative flex border-t-[1px] border-white">
          {/* mobile menu */}
          <div className="flex items-center">
            {role != 'client' && state.session != null && (
              <Link
                className="text-[rgba(219,96,53)] px-3 uppercase text-[.5rem] tracking-[.2em] lg:tracking-[.3em]  font-normal"
                href="/clients/new">
                + New Client
              </Link>
            )}
          </div>
          <div className=" flex justify-center w-1/3 h-12 m-auto">
            <Link
              className="relative w-full h-full m-auto"
              onClick={() => {
                if (pathSlug != 'Lucy-Kevin') {
                  router.back();
                }
              }}
              href={
                role == 'client'
                  ? `/clients/${clientSlug}`
                  : state.session != null
                  ? `/Homepage`
                  : ''
              }>
              <Image
                priority
                className=""
                src="/images/DSE-Logo.svg"
                alt="DSE Logo"
                fill
              />
            </Link>
          </div>
          {/* hamburger icon */}
          <div className=" flex items-center justify-end">
            {state.session != null && (
              <button
                type="button"
                onClick={() => {
                  setState({ ...state, showMobileMenu: !state.showMobileMenu });
                }}
                className="focus:outline-none focus:ring-offset-2 focus:ring-transparent inline-flex items-center px-4 my-0 text-sm font-normal text-white border-0 border-transparent rounded-md shadow-sm"
                aria-controls="mobile-menu"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24">
                  <path
                    stroke="#db6035"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className=" overflow-hidden">
          <div
            onClick={() => {
              setState({ ...state, showMobileMenu: false });
            }}
            style={{ maxHeight: state.showMobileMenu ? '100vh' : '0' }}
            className="max-w-screen absolute left-0 z-10 w-full h-screen transition-all duration-500 ease-in-out bg-transparent"
          />

          <div
            className="md:hidden z-20 justify-center text-center transition-all duration-500 ease-in-out overflow-hidden max-h-[100vh] left-0 bg-[#eed9d4] w-full absolute"
            style={{ maxHeight: state.showMobileMenu ? '100vh' : '0' }}
            id="mobile-menu">
            <div className="sm:px-3 px-2 pt-2 pb-3 space-y-1">
              {role != 'client' && (
                <div>
                  <Link
                    className="block px-3 py-2 text-base font-normal text-black rounded-md"
                    href="/Homepage">
                    Clients
                  </Link>
                  <Link
                    className="block px-3 py-2 text-base font-normal text-black rounded-md"
                    href="/planners">
                    Planners
                  </Link>
                  <Link
                    className="block px-3 py-2 text-base font-normal text-black rounded-md"
                    href={`/planners/edit/${plannerSlug}`}>
                    My Info
                  </Link>
                </div>
              )}
              <button
                className="block px-3 py-2 mx-auto text-base font-normal text-black rounded-md"
                rel="nofollow"
                onClick={() => {
                  handleSignOut();
                }}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </nav>
    )
  );
};

export default Navigation;
