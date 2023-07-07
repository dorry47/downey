import Link from 'next/link';
import React from 'react';

type Props = {
  links: { href: string; title: string }[];
};

const Footer = (props: Props) => {
  return (
    <footer className="mt-6 mb-4">
      <div className="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto">
        <div className="md:flex-row md:space-x-10 md:space-y-0 flex flex-col justify-center py-4 space-x-0 space-y-4">
          {props.links.map((link) => (
            <Link
              className="font-display md:text-sm hover:bg-transparent hover:text-[rgba(217,142,72)] px-2 text-xs tracking-widest text-center text-black uppercase"
              href={link.href}>
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
