'use client';
import { usePathname } from 'next/navigation';
import QuickLink from '../../../../components/Slug/QuickLink';
import quickLinks from '../../../data/quickLinks.json';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useClient } from '../../../../lib/useClient';
import { bgImages } from '../../../../constants/NEW_CLIENT_CONSTS';
import { set } from 'react-hook-form';
interface PlanningLinks {
  workflow_url: string;
  budget_url: string;
  address_url: string;
  design_url: string;
  client_url: string;
  vendor_url: string;
  guest_url: string;
  calendar_url: string;
  [key: string]: string; // add index signature
}
interface ClientData {
  plannerName: string;
  SLUG: string;
  P_A_FNAME: string;
  P_A_LNAME: string;
  P_A_PHONE: string;
  P_A_EMAIL: string;
  P_A_ADD1: string;
  P_A_ADD2: string;
  P_A_CITY: string;
  P_A_STATE: string;
  P_A_ZIP: string;
  P_B_FNAME: string;
  P_B_LNAME: string;
  P_B_PHONE: string;
  P_B_EMAIL: string;
  P_B_ADD1: string;
  P_B_ADD2: string;
  P_B_CITY: string;
  P_B_STATE: string;
  P_B_ZIP: string;
  VENUE_NAME: string;
  VENUE_CITY: string;
  VENUE_STATE: string;
  WED_MONTH: string;
  WED_DAY: string;
  WED_YEAR: string;
  ARCHIVED: string;
  BG_IMAGE_ID: string;
  PLANNING_LINKS: PlanningLinks;
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
  const [plannerData, setPlannerData] = useState<any>();
  const [bgImageURL, setBgImageURL] = useState<any>('');
  const [documents, setDocuments] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const fetchedPlanningLinks = useMemo(
    () => clientData?.PLANNING_LINKS,
    [clientData]
  );

  // i want to compare the titleKey in the quickLinks.json to the key in the PLANNING_LINKS object

  const planningLinks = useMemo(() => {
    const planningLinks = quickLinks.filter((quickLink) => {
      const { titleKey } = quickLink;
      // but i also want to se the href to the value of the key in the PLANNING_LINKS object
      quickLink.href = fetchedPlanningLinks?.[
        titleKey as keyof PlanningLinks
      ] as string; // cast titleKey to keyof PlanningLinks
      return fetchedPlanningLinks?.[titleKey as keyof PlanningLinks]; // cast titleKey to keyof PlanningLinks
    });
    return planningLinks;
  }, [fetchedPlanningLinks]);

  console.log('planningLinks', planningLinks);

  const supabase = useClient();

  useEffect(() => {
    fetchDocuments().then((data: any) => {
      console.log('documents', data);
      setDocuments(data);
    });
  }, []);

  useEffect(() => {
    fetchEventData().then((data: any) => {
      if (documents) {
        // Leads to editable forms
        data[0].PLANNING_LINKS.CONTRACT_URL = `/documents/${
          documents.find((document: any) => document.title == 'Contract').id
        }?edit=${data[0].SLUG}`;
        data[0].PLANNING_LINKS.CATERING_URL = `/documents/${
          documents?.find((document: any) => document.title == 'Catering')?.id
        }?edit=${data[0].SLUG}`;
        data[0].PLANNING_LINKS.MUSIC_URL = `/documents/${
          documents?.find((document: any) => document.title == 'Music')?.id
        }?edit=${data[0].SLUG}`;
        data[0].PLANNING_LINKS.GUEST_SERVE_URL = `/documents/${
          documents?.find((document: any) => document.title == 'Guest Services')
            ?.id
        }?edit=${data[0].SLUG}`;
        data[0].PLANNING_LINKS.DESIGN_URL = `/documents/${
          documents?.find((document: any) => document.title == 'Design')?.id
        }?edit=${data[0].SLUG}`;
        data[0].PLANNING_LINKS.WORKFLOW_URL = `/documents/${
          documents?.find((document: any) => document.title == 'Workflow')?.id
        }?edit=${data[0].SLUG}`;
        // Rest of the data captured from the backend call.
        setClientData(data[0] as ClientData);
        setIsLoading(false);
      }
    });
  }, [documents]);

  useEffect(() => {
    fetchPlannerData().then((data: any) => {
      const dataObj = data[0];
      if (dataObj) {
        const formattedAddress = dataObj?.address.replace(/\n/g, '<br />');
        dataObj.address = formattedAddress as string;
        setPlannerData(dataObj);
      }
    });
    const bgImage = bgImages.find(
      (image) => image.id.toString() === clientData?.BG_IMAGE_ID
    );
    setBgImageURL(bgImage?.url);

    console.log('clientData', clientData);
  }, [clientData]);

  console.log('bgImageURL', bgImageURL);

  useEffect(() => {
    console.log('clientData', clientData);
    console.log('planner name', clientData?.plannerName);
    console.log('plannerData', plannerData);
  }, [clientData, plannerData]);

  const fetchEventData = async () => {
    let { data, error } = await supabase
      .from('new_client')
      // take the client slug and look for it in the database
      .select(
        `plannerName, SLUG, PEOPLE->>P_A_FNAME, PEOPLE->>P_A_LNAME, 
        PEOPLE->>P_A_EMAIL, PEOPLE->>P_A_PHONE, PEOPLE->>P_A_ADD1, 
        PEOPLE->>P_A_ADD2, PEOPLE->>P_A_CITY, PEOPLE->>P_A_STATE, 
        PEOPLE->>P_A_ZIP, PEOPLE->>P_B_ADD1, PEOPLE->>P_B_ADD2, 
        PEOPLE->>P_B_CITY, PEOPLE->>P_B_STATE, PEOPLE->>P_B_ZIP, 
        PEOPLE->>P_B_PHONE, PEOPLE->>P_B_EMAIL, PEOPLE->>P_B_FNAME, 
        PEOPLE->>P_B_LNAME, PEOPLE->>P_B_ADDRESS, EVENT_DETAILS->>VENUE_NAME, 
        EVENT_DETAILS->>VENUE_CITY, EVENT_DETAILS->>WED_MONTH, 
        EVENT_DETAILS->>VENUE_STATE, EVENT_DETAILS->>WED_DAY, EVENT_DETAILS->>WED_YEAR, 
        ADMIN_INFO->>ARCHIVED, PLANNING_LINKS, PUBLIC_LINKS, SITE_INFO->>BG_IMAGE_ID`
      )
      .eq('SLUG', clientSlug);
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  const fetchPlannerData = async () => {
    let { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('role', 'planner')
      .eq('name', clientData?.plannerName);
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  const fetchDocuments = async () => {
    let { data, error } = await supabase
      .from('documents')
      .select('id, title')
      .eq('status', 'Published');
    if (error) {
      console.log(error);
    }
    return data;
  };

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
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header
        className="bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgImageURL})`,
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
          {planningLinks.map((quickLink, id) => {
            const { title, subtitle, href, imageSrc, active, titleKey } =
              quickLink;
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
                Couples Details
              </h4>
              <div className="grid grid-cols-2">
                <div className="md:col-span-1 col-span-2 pb-6">
                  <h2 className="font-display md:text-sm mb-1 text-lg tracking-widest">
                    {clientData?.P_A_FNAME} {clientData?.P_A_LNAME}
                  </h2>
                  <p className="lining-nums mb-1 font-serif">
                    {clientData?.P_A_PHONE}
                  </p>
                  <p className="mb-1 font-serif">{clientData?.P_A_EMAIL}</p>
                  <p className="lining-nums pt-2 font-serif leading-relaxed">
                    {clientData?.P_A_ADD1} <br />
                    {clientData?.P_A_ADD2} <br />
                    {clientData?.P_A_CITY && clientData?.P_A_CITY + ','}{' '}
                    {clientData?.P_A_STATE}
                  </p>
                </div>
                <div className="col-span-1">
                  <h2 className="font-display md:text-sm mb-1 text-lg tracking-widest">
                    {clientData?.P_B_FNAME} {clientData?.P_B_LNAME}
                  </h2>
                  <p className="lining-nums mb-1 font-serif">
                    {clientData?.P_B_PHONE}
                  </p>
                  <p className="mb-1 font-serif">{clientData?.P_B_EMAIL}</p>
                  <p className="lining-nums pt-2 font-serif leading-relaxed">
                    {clientData?.P_B_ADD1} <br />
                    {clientData?.P_B_ADD2} <br />
                    {clientData?.P_B_CITY && clientData?.P_B_CITY + ','}{' '}
                    {clientData?.P_B_STATE}
                  </p>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 col-span-3 text-left">
              <h4 className="text-left text-[rgba(217,142,72)] pt-3 mb-1 font-sans font-normal uppercase text-xxs tracking-extrawide">
                Planners Details
              </h4>
              <h2 className="font-display md:text-sm mb-1 text-lg tracking-widest">
                {plannerData?.name}
              </h2>
              <p className="lining-nums mb-1 font-serif">
                {plannerData?.phone}
              </p>
              <p className="mb-1 font-serif">{plannerData?.email}</p>
              <p
                dangerouslySetInnerHTML={{ __html: plannerData?.address }}
                className="lining-nums pt-2 font-serif leading-relaxed"></p>
            </div>
            <div className="col-span-3">
              <Link href={`/clients/new?edit=${clientData?.SLUG}`}>
                <h4 className="text-xxs tracking-extrawide pt-3 mb-1 font-sans font-normal text-black uppercase">
                  Edit Event Details
                </h4>
              </Link>{' '}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
