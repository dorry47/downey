import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const Navigation = (props: Props) => {
  return (
    <nav className="bg-[rgba(238,217,212)] h-12 md:h-16 w-full text-xl px-[2rem]">
      <div className="md:flex max-w-7xl items-center justify-between hidden h-full m-auto">
        <div className="flex items-baseline flex-1 space-x-1">
          <Link
            className="text-[rgba(219,96,53)] px-3 uppercase text-[.5rem] tracking-[.2em] lg:tracking-[.3em]  font-normal"
            href="/projects/new">
            + New Client
          </Link>
          <Link
            className="text-black px-3 uppercase text-[.5rem] tracking-[.2em] lg:tracking-[.3em]  font-normal"
            href="/">
            Clients
          </Link>
          <Link
            className="text-black px-3 uppercase text-[.5rem] tracking-[.2em] lg:tracking-[.3em] font-normal"
            href="/users">
            Planners
          </Link>
        </div>
        <div className=" lg:w-96 relative flex justify-center flex-shrink-0 w-1/4 h-full m-auto">
          <Link className="w-full h-full m-auto" href="/">
            <Image
              className="p-2"
              src="/images/DSE-Logo.svg"
              alt="DSE Logo"
              fill
            />
          </Link>
        </div>
        <div className="lg:flex-row-reverse lg:justify-normal flex justify-center flex-1">
          <Link
            className="text-black px-3 uppercase text-[.5rem] tracking-[.3em] font-normal"
            href="">
            hi Kelsey
          </Link>{' '}
          <Link
            className="text-black px-3 uppercase text-[.5rem] tracking-[.3em] font-normal"
            rel="nofollow"
            data-method="delete"
            href="/logout">
            Log Out
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
