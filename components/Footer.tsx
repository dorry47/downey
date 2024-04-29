'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useClient } from '../lib/useClient'; // import supabase client
import { usePathname, useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { globalStateAtom } from '../context/atoms';

type Props = {
  links: { href: string; title: string }[];
};

const Footer = (props: Props) => {
  const [state, setState] = useAtom(globalStateAtom);
  const [plannerSlug, setPlannerSlug] = React.useState<any>(null);

  const path = usePathname();
  const router = useRouter();

  const supabase = useClient();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const slug = state.loggedInUser?.name;
    setPlannerSlug(slug?.replace(/\s+/g, '-').toLowerCase());
  }, [state.loggedInUser]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setState({
        ...state,
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

  return (
    path !== '/' &&
    isClient &&
    (state.loggedInUser?.role == 'planner' ||
      state.loggedInUser?.role == 'stylist') && (
      <footer className="mt-6 mb-4">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto">
          <div className="md:flex-row md:space-x-10 md:space-y-0 flex flex-col justify-center py-4 space-x-0 space-y-4">
            {props.links.map((link, id) => (
              <Link
                key={id}
                className="font-display md:text-sm hover:bg-transparent hover:text-[rgba(217,142,72)] px-2 text-xs tracking-widest text-center text-black uppercase"
                href={`${link.href}${
                  link.title == 'My Info' ? plannerSlug : ''
                }`}>
                {link.title}
              </Link>
            ))}
            <button
              onClick={() => handleSignOut()}
              className="font-display md:text-sm hover:bg-transparent hover:text-[rgba(217,142,72)] px-2 text-xs tracking-widest text-center text-black uppercase">
              Log Out
            </button>{' '}
            {/* call handleSignOut function */}
          </div>
        </div>
      </footer>
    )
  );
};

export default Footer;
