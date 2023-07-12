'use client';
import { useEffect } from 'react';
import QuickLink from '../../../../components/Slug/QuickLink';
import quickLinks from '../../../data/quickLinks.json';

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <header
        className="bg-center bg-cover"
        style={{
          backgroundImage:
            'url(https://planning.downeystreetevents.com/assets/client-banner-10-956d8de47062998b50be5d42950573275481b0b2aac7e841228e2807f50a3aee.jpg)',
        }}>
        <div className="max-w-7xl sm:px-6 lg:px-8 p-4 mx-auto text-white">
          <div className="md:items-center md:py-16 md:border-none border-[rgba(238,217,212)] grid grid-cols-12 gap-6 py-8 text-center border">
            <div className="md:col-span-3 md:order-1 order-2 col-span-6">
              <h1 className="font-display tracking-extrawide lining-nums text-base font-normal leading-tight uppercase">
                404 Days
              </h1>
              <h2 className="text-xxs tracking-extrawide font-normal uppercase">
                until the big day
              </h2>
            </div>
            <div className="md:col-span-6 md:py-16 md:border border-[rgba(238,217,212)] md:order-2 order-1 col-span-12 mx-8 border-b border-solid">
              <h1 className="font-display text-3xl font-normal leading-tight tracking-widest uppercase">
                Lauren + John
              </h1>
              <h2 className="font-display tracking-extrawide lining-nums pt-2 pb-4 text-base font-normal leading-tight uppercase">
                August 17, 2024
              </h2>
            </div>
            <div className="md:col-span-3 order-3 col-span-6">
              <h1 className="font-display tracking-extrawide text-base font-normal leading-tight uppercase">
                Cavallo Point Lodge
              </h1>
              <h2 className="font-cursive -rotate-6 text-lg tracking-wider transform">
                Sausalito, California
              </h2>
            </div>
          </div>
        </div>
      </header>

      <section className="sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="sm:grid-cols-3 md:grid-cols-4 sm:gap-6 sm:py-10 grid grid-cols-2 gap-2 py-4 text-center">
          {quickLinks.map((quickLink, id) => {
            const { title, subtitle, href, imageSrc, active } = quickLink;
            return (
              <QuickLink
                key={id}
                title={title}
                subtitle={subtitle}
                href={href}
                imageSrc={imageSrc}
                active={active}
              />
            );
          })}
        </div>
      </section>

      <section className="bg-[rgba(238,217,212)]">
        <div className="sm:px-6 lg:px-8 md:py-10 max-w-6xl px-4 py-6 mx-auto">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="md:col-span-2 col-span-3 font-serif text-left">
              <h4 className="text-left text-[rgba(217,142,72)] pt-3 mb-1 font-sans font-normal uppercase text-xxs tracking-extrawide">
                couples details
              </h4>
              <div className="grid grid-cols-2">
                <div className="md:col-span-1 col-span-2 pb-6">
                  <h2 className="font-display md:text-sm mb-1 text-lg tracking-widest">
                    test testt
                  </h2>
                  <p className="lining-nums mb-1 font-serif">t. </p>
                  <p className="mb-1 font-serif">
                    kelsey@downeystreetevents.com
                  </p>
                  <p className="lining-nums pt-2 font-serif leading-relaxed">
                    <br></br>
                    <br></br>,{' '}
                  </p>
                </div>
                <div className="col-span-1">
                  <h2 className="font-display md:text-sm mb-1 text-lg tracking-widest">
                    test2 test22
                  </h2>
                  <p className="lining-nums mb-1 font-serif">t. </p>
                  <p className="mb-1 font-serif"></p>
                  <p className="lining-nums pt-2 font-serif leading-relaxed">
                    <br></br>
                    <br></br>,{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 col-span-3 text-left">
              <h4 className="text-left text-[rgba(217,142,72)] pt-3 mb-1 font-sans font-normal uppercase text-xxs tracking-extrawide">
                planners details
              </h4>
              <h2 className="font-display md:text-sm mb-1 text-lg tracking-widest">
                Kelsey Connely
              </h2>
              <p className="lining-nums mb-1 font-serif">t. 724.877.6966</p>
              <p className="mb-1 font-serif">kelsey@downeystreetevents.com</p>
              <p className="lining-nums pt-2 font-serif leading-relaxed">
                3366 Sacramento Street<br></br>
                Attn: Kelsey Connely<br></br>
                San Francisco, CA 90001
              </p>
            </div>
            <div className="col-span-3">
              <a href="/test-and-test2/edit">
                <h4 className="text-xxs tracking-extrawide pt-3 mb-1 font-sans font-normal text-black uppercase">
                  edit event details
                </h4>
              </a>{' '}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
