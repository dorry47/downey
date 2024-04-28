import Link from 'next/link';
import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  imageSrc: string;
  href: string;
  active: boolean;
};

const QuickLinks = (props: Props) => {
  const { title, subtitle, imageSrc, href, active } = props;

  return (
    <div className={`col-span-1 mb-4 ${!active ? 'visible' : 'hidden'}`}>
      <Link href={href}>
        <img
          className="h-[200px] w-[200px] mx-auto object-contain"
          src={imageSrc}></img>
        <h4 className="text-xxs sm:text-xxs tracking-extrawide pt-4 font-normal text-black uppercase">
          {subtitle}
        </h4>
        <h2 className="text-black hover:text-[rgba(217,142,72)] font-display font-normal uppercase text-xs sm:text-base leading-4 tracking-extrawide lining-nums ">
          {title}
        </h2>
      </Link>
    </div>
  );
};

export default QuickLinks;
