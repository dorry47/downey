import Link from 'next/link';
import React from 'react';
import { useClient } from '../lib/useClient'; // import supabase client
import { useStateContext } from '../context/StateContext';
import { useRouter } from 'next/navigation';

type Props = {
  links: { href: string; title: string }[];
};

const Footer = (props: Props) => {
  const { setState } = useStateContext();
  const router = useRouter();

  const supabase = useClient();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.clear();
      setState({ session: null, user: null });
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <footer className="mt-6 mb-4">
      <div className="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto">
        <div className="md:flex-row md:space-x-10 md:space-y-0 flex flex-col justify-center py-4 space-x-0 space-y-4">
          {props.links.map((link, id) => (
            <Link
              key={id}
              className="font-display md:text-sm hover:bg-transparent hover:text-[rgba(217,142,72)] px-2 text-xs tracking-widest text-center text-black uppercase"
              href={link.href}>
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
  );
};

export default Footer;
