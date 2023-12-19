'use client';
import { usePathname, useRouter } from 'next/navigation';
import QuickLink from '../../../../components/Slug/QuickLink';
import quickLinks from '../../../data/quickLinks.json';
import React, { use, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useClient } from '../../../../lib/useClient';
import { bgImages } from '../../../../constants/NEW_CLIENT_CONSTS';
import { set } from 'react-hook-form';
import { useStateContext } from '../../../../context/StateContext';
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
  const pathName = usePathname();
  const router = useRouter();
  const clientSlug = pathName.split('/clients/')[1];
  const [clientData, setClientData] = useState<ClientData>();
  const [plannerData, setPlannerData] = useState<any>();
  const [bgImageURL, setBgImageURL] = useState<any>('');
  const [documents, setDocuments] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const { state, setState } = useStateContext();
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const supabase = useClient();

  const fetchedPlanningLinks = useMemo(
    () => clientData?.PLANNING_LINKS,
    [clientData]
  );

  // i want to compare the titleKey in the quickLinks.json to the key in the PLANNING_LINKS object

  const planningLinks = useMemo(() => {
    const planningLinks = quickLinks[0].required.filter((quickLink) => {
      const { titleKey } = quickLink;
      // but i also want to se the href to the value of the key in the PLANNING_LINKS object
      quickLink.href = fetchedPlanningLinks?.[
        titleKey as keyof PlanningLinks
      ] as string; // cast titleKey to keyof PlanningLinks
      return fetchedPlanningLinks?.[titleKey as keyof PlanningLinks]; // cast titleKey to keyof PlanningLinks
    });
    const optionalLinks = quickLinks[0].notRequired.filter((quickLink) => {
      const { titleKey } = quickLink;
      // but i also want to se the href to the value of the key in the PLANNING_LINKS object
      quickLink.href = fetchedPlanningLinks?.[
        titleKey as keyof PlanningLinks
      ] as string; // cast titleKey to keyof PlanningLinks
      return fetchedPlanningLinks?.[titleKey as keyof PlanningLinks]; // cast titleKey to keyof PlanningLinks
    });

    return [
      {
        required: planningLinks,
        notRequired: optionalLinks,
      },
    ];
  }, [fetchedPlanningLinks]);

  // useEffect(() => {
  //   const loggedInUser = async () => {
  //     await supabase
  //       .from('users')
  //       .select('*')
  //       .eq('email', state?.user?.email)
  //       .then((data: any) => {
  //         console.log('slug signed in user', data?.data[0]);
  //         setLoggedInUser(data?.data[0]);
  //       });
  //   };
  //   loggedInUser();
  // }, [state?.user?.email]);

  console.log('planningLinks', planningLinks);

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
        data[0].PLANNING_LINKS.CONTRACT_URL = `/clients/agreement?edit=${data[0].SLUG}`;
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
        // data[0].PLANNING_LINKS.WORKFLOW_URL = `/documents/${
        //   documents?.find((document: any) => document.title == 'Workflow')?.id
        // }?edit=${data[0].SLUG}`;
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
    return (
      <div className=" flex items-center justify-center w-screen h-screen">
        <svg
          aria-hidden="true"
          className="animate-spin fill-[#e7c8c0] mx-auto w-[100px] h-[100px] text-gray-300"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <div>
      <header
        className="bg-center bg-cover"
        style={{
          backgroundImage: `url(${bgImageURL})`,
          backgroundPosition: 'top center',
        }}>
        <div className="max-w-7xl sm:px-6 lg:px-8 p-4 mx-auto text-white">
          <div className="md:items-center md:py-16 md:border-none border-[rgba(238,217,212)] grid grid-cols-12 gap-6 py-8 text-center border">
            <div className="md:col-span-3 md:order-1 order-2 col-span-6">
              {clientData?.WED_DAY &&
                clientData.WED_MONTH &&
                clientData.WED_YEAR && (
                  <>
                    <h1 className="font-display tracking-extrawide lining-nums text-base font-normal leading-tight uppercase">
                      {countdown(date)} days
                    </h1>
                    <h2 className="text-xxs tracking-extrawide font-normal uppercase">
                      until the big day
                    </h2>
                  </>
                )}
            </div>
            <div className="md:col-span-6 md:py-16 md:border border-[rgba(238,217,212)] md:order-2 order-1 col-span-12 mx-8 border-b border-solid">
              <h1 className="font-display text-3xl font-normal leading-tight tracking-widest uppercase">
                {names.join(' & ')}
              </h1>

              <h2 className="font-display tracking-extrawide lining-nums pt-2 pb-4 text-base font-normal leading-tight uppercase">
                {clientData?.WED_DAY &&
                  clientData.WED_MONTH &&
                  clientData.WED_YEAR &&
                  date}
              </h2>
            </div>
            <div className="md:col-span-3 order-3 col-span-6">
              <h1 className="font-display tracking-extrawide text-base font-normal leading-tight uppercase">
                {clientData?.VENUE_NAME}
              </h1>
              <h2 className="font-display text-lg tracking-wider transform">
                {clientData?.VENUE_CITY &&
                  clientData?.VENUE_STATE &&
                  clientData?.VENUE_CITY + ',' + clientData?.VENUE_STATE}
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

      {/* <section className="bg-dse-gold h-16">
        <div className="max-w-7xl sm:px-6 lg:px-8 py-6 mx-auto">
          <ul className="flex justify-center space-x-4">
            <li className="">
              <Link
                href="#"
                className="text-xxs tracking-extrawide hover:bg-transparent font-normal uppercase pointer-events-none">
                Onboarding Links:
              </Link>
            </li>
            <li>
              <Link
                className="text-xxs tracking-extrawide hover:bg-transparent font-normal uppercase"
                href={`/clients/new?edit=${clientSlug}`}>
                Signup
              </Link>
            </li>
            <li>
              <Link
                className="text-xxs tracking-extrawide hover:bg-transparent font-normal uppercase"
                href={`/clients/agreement?edit=${clientSlug}`}>
                Agreement
              </Link>
            </li>
          </ul>
        </div>
      </section> */}

      <section className="sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="sm:grid-cols-3 md:grid-cols-4 sm:gap-6 sm:py-10 grid grid-cols-2 gap-2 py-4 text-center">
          {planningLinks[0].required.map((quickLink, id) => {
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
          {planningLinks[0].notRequired.length > 0 && (
            <>
              {planningLinks[0].notRequired.map((quickLink, id) => {
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
            </>
          )}
        </div>
      </section>

      <section className="bg-[rgba(238,217,212)]">
        <div className="sm:px-6 lg:px-8 md:py-10 max-w-6xl px-4 py-6 mx-auto">
          <div className="flex flex-col text-center">
            <div className="md:flex-row flex flex-col justify-center gap-6">
              <div className="md:w-1/2 w-full mx-auto font-serif text-left">
                <h4 className="text-left text-[rgba(217,142,72)] pt-3 mb-1 font-sans font-normal uppercase text-xxs tracking-extrawide">
                  Couples Details
                </h4>
                <div className="flex flex-wrap gap-6">
                  <div className="md:w-1/2 w-full pb-6">
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
                  <div className="md:w-1/2 w-full">
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
              <div className="md:w-1/3 w-full mx-auto text-left">
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
            </div>
            <div className="col-span-3">
              <Link href={`/clients/new?edit=${clientData?.SLUG}`}>
                <button className="md:py-2 mt-4 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer">
                  Edit Event Details
                </button>
              </Link>{' '}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
