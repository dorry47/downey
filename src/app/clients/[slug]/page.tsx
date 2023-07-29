'use client';
import { usePathname } from 'next/navigation';
import QuickLink from '../../../../components/Slug/QuickLink';
import quickLinks from '../../../data/quickLinks.json';
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useClient } from '../../../../lib/useClient';

interface ClientData {
  plannerName: string;
  SLUG: string;
  P_A_FNAME: string;
  P_B_FNAME: string;
  VENUE_NAME: string;
  VENUE_CITY: string;
  VENUE_STATE: string;
  WED_MONTH: string;
  WED_DAY: string;
  WED_YEAR: string;
  ARCHIVED: string;
  PLANNING_LINKS: {
    workflow_url: string;
    budget_url: string;
    address_url: string;
    design_url: string;
    client_url: string;
    vendor_url: string;
    guest_url: string;
    calendar_url: string;
  };
  PUBLIC_LINKS: {
    blog_url: string;
    website_url: string;
    facebook_url: string;
    registry_url: string;
    instagram_url: string;
    pinterest_url: string;
  };
}

const Page = () => {
  const router = usePathname();
  const clientSlug = router.split('/clients/')[1];
  const [clientData, setClientData] = useState<ClientData>();

  const supabase = useClient();

  const fetchEventData = async () => {
    let { data, error } = await supabase
      .from('new_client')
      // take the client slug and look for it in the database
      .select(
        'plannerName, SLUG, PEOPLE->>P_A_FNAME, PEOPLE->>P_B_FNAME, EVENT_DETAILS->>VENUE_NAME, EVENT_DETAILS->>VENUE_CITY, EVENT_DETAILS->>WED_MONTH, EVENT_DETAILS->>VENUE_STATE, EVENT_DETAILS->>WED_DAY, EVENT_DETAILS->>WED_YEAR, ADMIN_INFO->>ARCHIVED, PLANNING_LINKS, PUBLIC_LINKS'
      )
      .eq('SLUG', clientSlug);
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  useMemo(() => {
    fetchEventData().then((data: any) => {
      console.log('RETURNED DATA', data);
      setClientData(data[0] as ClientData);
    });
  }, []);

  const date = `${clientData?.WED_MONTH} ${clientData?.WED_DAY}, ${clientData?.WED_YEAR}`;
  const names = [clientData?.P_A_FNAME, clientData?.P_B_FNAME];

  const countdown = (date: string) => {
    const countDownDate = new Date(date).getTime();
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24)) - 1;
    return days;
  };

  const formatDate = (date: string) => {
    console.log(date);
    const [month, day, year] = date.split(' ');
    return `${month} ${day} ${year}`;
  };

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
                {countdown(date)} days
              </h1>
              <h2 className="text-xxs tracking-extrawide font-normal uppercase">
                until the big day
              </h2>
            </div>
            <div className="md:col-span-6 md:py-16 md:border border-[rgba(238,217,212)] md:order-2 order-1 col-span-12 mx-8 border-b border-solid">
              <h1 className="font-display text-3xl font-normal leading-tight tracking-widest uppercase">
                {names.join(' & ')}
              </h1>
              <h2 className="font-display tracking-extrawide lining-nums pt-2 pb-4 text-base font-normal leading-tight uppercase">
                {formatDate(date)}
              </h2>
            </div>
            <div className="md:col-span-3 order-3 col-span-6">
              <h1 className="font-display tracking-extrawide text-base font-normal leading-tight uppercase">
                {clientData?.VENUE_NAME}
              </h1>
              <h2 className="font-cursive -rotate-6 text-lg tracking-wider transform">
                {clientData?.VENUE_CITY}, {clientData?.VENUE_STATE}
              </h2>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-dse-peach h-16">
        <div className="max-w-7xl sm:px-6 lg:px-8 py-6 mx-auto">
          <ul className="flex justify-center space-x-4"></ul>
        </div>
      </section>

      <section className="bg-dse-gold h-16">
        <div className="max-w-7xl sm:px-6 lg:px-8 py-6 mx-auto">
          <ul className="flex justify-center space-x-4">
            <li className="">
              <Link
                href="#"
                className="text-xxs tracking-extrawide hover:bg-transparent font-normal uppercase">
                Admin Links:
              </Link>
            </li>
            <li>
              <Link
                className="text-xxs tracking-extrawide hover:bg-transparent font-normal uppercase"
                href="/luna-and-taylor/signup">
                Signup
              </Link>
            </li>
            <li>
              <Link
                className="text-xxs tracking-extrawide hover:bg-transparent font-normal uppercase"
                href="/luna-and-taylor/agreement">
                Agreement
              </Link>
            </li>
            <li>
              <Link
                className="text-xxs tracking-extrawide hover:bg-transparent font-normal uppercase"
                href="/luna-and-taylor/payment">
                Payment
              </Link>
            </li>
          </ul>
        </div>
      </section>

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
              <a href="">
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

export default Page;
