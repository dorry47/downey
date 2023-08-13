import Link from 'next/link';
import React from 'react';

type Props = {
  names: string[];
  date: string;
  active: string;
  slug: string;
};

const ClientBox = (props: Props) => {
  const names = props.names.join(' + ');
  return (
    <>
      <Link href={`/clients/${props.slug}`}>
        <div
          className={`md:col-span-1 ${
            props.active != 'true'
              ? 'bg-[rgba(238,217,212)]'
              : 'bg-[rgba(217,216,214)]'
          }  md:py-6 py-3`}>
          <div className="md:mx-6 border-[rgba(219,96,53)] text-[rgba(219,96,53)] mx-3 border">
            <h3 className="font-display md:text-xl md:mt-6 mt-3 text-base font-normal leading-tight tracking-widest uppercase">
              {names}
            </h3>
            <h4 className="font-display md:text-sm tracking-extrawide lining-nums md:pb-6 pt-1 pb-3 text-xs font-normal leading-tight uppercase">
              {props.date}
            </h4>
          </div>
        </div>
      </Link>
    </>
  );
};

export default ClientBox;
