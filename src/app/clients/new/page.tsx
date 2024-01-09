'use client';
import React, { use, useEffect } from 'react';
import { set, useController, useForm } from 'react-hook-form';
// import planners from '../../../data/planners.json';
import {
  days,
  months,
  years,
  guestRange,
  bgImages,
} from '../../../../constants/NEW_CLIENT_CONSTS';
import { useStateContext } from '../../../../context/StateContext';
import { useClient } from '../../../../lib/useClient';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Planner {
  name: string;
  email: string;
  phone: string;
  address: string;
  archived: boolean;
}

type Props = {};

const Page = (props: Props) => {
  const [selectedBgImageId, setSelectedBgImageId] = React.useState(0);
  const [planners, setPlanners] = React.useState<any>([]);
  const [editClientData, setEditClientData] = React.useState<any>([]);
  const [submitted, setSubmitted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { state, setState } = useStateContext();
  const supabase = useClient();
  const router = useRouter();
  const params = useSearchParams();
  const slug = editClientData[0]?.SLUG;
  console.log('slug', slug);

  const urlParameter = params.get('edit');

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      ADMIN_INFO: {
        PLANNER: '',
        // AMMEND: '',
        ARCHIVED: false,
      },
      EVENT_DETAILS: {
        DATE: '',
        WED_MONTH: '',
        WED_DAY: '',
        WED_YEAR: '',
        VENUE_NAME: '',
        VENUE_CITY: '',
        VENUE_STATE: '',
        GUEST_RANGE_START: '',
        GUEST_RANGE_END: '',
      },
      PEOPLE: {
        P_A_FNAME: '',
        P_A_LNAME: '',
        P_A_ROLE: '',
        P_A_PHONE: '',
        P_A_EMAIL: '',
        P_A_ADD1: '',
        P_A_ADD2: '',
        P_A_CITY: '',
        P_A_STATE: '',
        P_A_ZIP: '',
        P_B_FNAME: '',
        P_B_LNAME: '',
        P_B_ROLE: '',
        P_B_PHONE: '',
        P_B_EMAIL: '',
        P_B_ADD1: '',
        P_B_ADD2: '',
        P_B_CITY: '',
        P_B_STATE: '',
        P_B_ZIP: '',
      },
      SITE_INFO: {
        SITE_PASSCODE: '',
        SITE_PASSCODE_CONFIRMATION: '',
        BG_IMAGE_ID: '',
      },
      PLANNING_LINKS: {
        // ADMIN FORMS
        DESIGN_URL: '',
        WORLFLOW_URL: '',
        MUSIC_URL: '',
        GUEST_SERVE_URL: '',
        CATERING_URL: '',
        CONTRACT_URL: '',
        // EXTERNAL LINKS
        ADDRESS_URL: '',
        BUDGET_URL: '',
        DESIGN_BOARD_URL: '',
        CLIENT_DOCS_URL: '',
        VENDOR_PROPOSALS_URL: '',
        VENDOR_CONTACT_URL: '',
        GUEST_INFO_URL: '',
        // CALENDAR_URL: '',
      },
      PUBLIC_LINKS: {
        YELP_URL: '',
        FACEBOOK_URL: '',
        REGISTRY_URL: '',
        INSTAGRAM_URL: '',
        PINTEREST_URL: '',
        TWITTER_URL: '',
      },
    },
  });

  const { field: archivedField } = useController({
    name: 'ADMIN_INFO.ARCHIVED',
    control,
    defaultValue: false, // Initial value for the checkbox
  });

  const checkAndRedirectIfVisited = (slug: string | undefined) => {
    // Use a unique key for identifying whether the user has visited the page
    const visitedKey = 'hasVisitedPage';

    // Check if the user has visited the page before
    const hasVisited = localStorage.getItem(visitedKey);

    // If the user has visited and a valid slug is provided, redirect them to the specified URL
    if (hasVisited == 'true' && slug != undefined) {
      // Use Next.js router for redirection
      router.push(`/clients/${slug}`);
      console.log('redirecting to', `/clients/${slug}`);
    } else {
      // If the user hasn't visited or no valid slug, set the flag in local storage
      localStorage.setItem(visitedKey, 'true');
      console.log('setting visited key');
    }
  };

  useEffect(() => {
    if (!slug) return;
    if (slug && !isLoading) {
      checkAndRedirectIfVisited(slug);
    }
  }, [slug]);

  const plannerData = async () => {
    let { data, error } = await supabase
      .from('users')
      .select('name, email')
      .eq('role', 'planner');
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  useEffect(() => {
    plannerData().then((planners) => {
      setPlanners(planners as any);
    });
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const editClientSlug = urlParams.get('edit');
    console.log('edit client slug', editClientSlug);

    const getClientData = async () => {
      let { data, error } = await supabase
        .from('new_client')
        .select('*')
        .eq('SLUG', editClientSlug);
      if (error) {
        console.log(error);
      } else {
        return data;
      }
    };

    getClientData().then((data) => {
      console.log('edit client data', data);
      setEditClientData(data);
    });
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (editClientData.length > 0) {
      const {
        SITE_INFO,
        ADMIN_INFO,
        EVENT_DETAILS,
        PEOPLE,
        PLANNING_LINKS,
        PUBLIC_LINKS,
      } = editClientData[0];
      setSelectedBgImageId(SITE_INFO.BG_IMAGE_ID);
      Object.entries({
        plannerName: ADMIN_INFO.PLANNER,
        'ADMIN_INFO.PLANNER': ADMIN_INFO.PLANNER,
        // 'ADMIN_INFO.AMMEND': ADMIN_INFO.AMMEND,
        'ADMIN_INFO.ARCHIVED': ADMIN_INFO.ARCHIVED,
        'EVENT_DETAILS.DATE': EVENT_DETAILS.DATE.toString(),
        'EVENT_DETAILS.WED_MONTH': EVENT_DETAILS.WED_MONTH,
        'EVENT_DETAILS.WED_DAY': EVENT_DETAILS.WED_DAY,
        'EVENT_DETAILS.WED_YEAR': EVENT_DETAILS.WED_YEAR,
        'EVENT_DETAILS.VENUE_NAME': EVENT_DETAILS.VENUE_NAME,
        'EVENT_DETAILS.VENUE_CITY': EVENT_DETAILS.VENUE_CITY,
        'EVENT_DETAILS.VENUE_STATE': EVENT_DETAILS.VENUE_STATE,
        'EVENT_DETAILS.GUEST_RANGE_START': EVENT_DETAILS.GUEST_RANGE_START,
        'EVENT_DETAILS.GUEST_RANGE_END': EVENT_DETAILS.GUEST_RANGE_END,
        'PEOPLE.P_A_FNAME': PEOPLE.P_A_FNAME,
        'PEOPLE.P_A_LNAME': PEOPLE.P_A_LNAME,
        'PEOPLE.P_A_ROLE': PEOPLE.P_A_ROLE,
        'PEOPLE.P_A_PHONE': PEOPLE.P_A_PHONE,
        'PEOPLE.P_A_EMAIL': PEOPLE.P_A_EMAIL,
        'PEOPLE.P_A_ADD1': PEOPLE.P_A_ADD1,
        'PEOPLE.P_A_ADD2': PEOPLE.P_A_ADD2,
        'PEOPLE.P_A_CITY': PEOPLE.P_A_CITY,
        'PEOPLE.P_A_STATE': PEOPLE.P_A_STATE,
        'PEOPLE.P_A_ZIP': PEOPLE.P_A_ZIP,
        'PEOPLE.P_B_FNAME': PEOPLE.P_B_FNAME,
        'PEOPLE.P_B_LNAME': PEOPLE.P_B_LNAME,
        'PEOPLE.P_B_ROLE': PEOPLE.P_B_ROLE,
        'PEOPLE.P_B_PHONE': PEOPLE.P_B_PHONE,
        'PEOPLE.P_B_EMAIL': PEOPLE.P_B_EMAIL,
        'PEOPLE.P_B_ADD1': PEOPLE.P_B_ADD1,
        'PEOPLE.P_B_ADD2': PEOPLE.P_B_ADD2,
        'PEOPLE.P_B_CITY': PEOPLE.P_B_CITY,
        'PEOPLE.P_B_STATE': PEOPLE.P_B_STATE,
        'PEOPLE.P_B_ZIP': PEOPLE.P_B_ZIP,
        'SITE_INFO.SITE_PASSCODE': SITE_INFO.SITE_PASSCODE,
        'SITE_INFO.SITE_PASSCODE_CONFIRMATION':
          SITE_INFO.SITE_PASSCODE_CONFIRMATION,
        'PLANNING_LINKS.BUDGET_URL': PLANNING_LINKS.BUDGET_URL,
        'PLANNING_LINKS.ADDRESS_URL': PLANNING_LINKS.ADDRESS_URL,
        'PLANNING_LINKS.DESIGN_BOARD_URL': PLANNING_LINKS.DESIGN_BOARD_URL,
        'PLANNING_LINKS.CLIENT_DOCS_URL': PLANNING_LINKS.CLIENT_DOCS_URL,
        'PLANNING_LINKS.VENDOR_PROPOSALS_URL':
          PLANNING_LINKS.VENDOR_PROPOSALS_URL,
        'PLANNING_LINKS.VENDOR_CONTACT_URL': PLANNING_LINKS.VENDOR_CONTACT_URL,
        'PLANNING_LINKS.GUEST_INFO_URL': PLANNING_LINKS.GUEST_INFO_URL,
        // 'PLANNING_LINKS.CALENDAR_URL': PLANNING_LINKS.GUEST_INFO_URL,
        'PUBLIC_LINKS.TWITTER_URL': PUBLIC_LINKS.TWITTER_URL,
        'PUBLIC_LINKS.YELP_URL': PUBLIC_LINKS.YELP_URL,
        'PUBLIC_LINKS.FACEBOOK_URL': PUBLIC_LINKS.FACEBOOK_URL,
        'PUBLIC_LINKS.REGISTRY_URL': PUBLIC_LINKS.REGISTRY_URL,
        'PUBLIC_LINKS.INSTAGRAM_URL': PUBLIC_LINKS.INSTAGRAM_URL,
        'PUBLIC_LINKS.PINTEREST_URL': PUBLIC_LINKS.PINTEREST_URL,
      }).forEach(
        (
          [key, value] // @ts-ignore
        ) => setValue(key, value)
      );
    }
  }, [editClientData]);

  console.log('planners', planners);

  const handleBgImageSelect = (id: number) => {
    setSelectedBgImageId(id);
  };

  const onSubmit = async (data: Record<string, any>) => {
    data.urlParameter = urlParameter;
    data.plannerEmail = planners.find(
      (planner: Planner) => planner.name === data.ADMIN_INFO.PLANNER
    )?.email;
    data.plannerName = planners.find(
      (planner: Planner) => planner.name === data.ADMIN_INFO.PLANNER
    )?.name;

    data.SITE_INFO.BG_IMAGE_ID = selectedBgImageId || bgImages[0].id;
    data.SLUG =
      data.PEOPLE.P_A_FNAME.trim() + '-' + data.PEOPLE.P_B_FNAME.trim();

    console.log('data', data);

    try {
      const response = await fetch('/api/newClient', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();

      if (responseData.error) {
        if (responseData.error) {
          console.log('error', responseData.error);
          toast.error(responseData.error, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
        }
      } else {
        if (state.loggedInUser?.role != 'client') {
          setSubmitted(true);
          reset();
        } else {
          const session = JSON.parse(localStorage.getItem('session') as string);
          const user = JSON.parse(localStorage.getItem('user') as string);
          setState({ ...state, session, user });
          window.location.href = `/clients/${data.SLUG}`;
        }
      }
    } catch (error: any) {
      console.error('Error:', error.message);
      toast.error(error.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };

  useEffect(() => {
    if (submitted) {
      console.log('redirecting to clients page');
      setTimeout(() => {
        router.push(`/Homepage`);
      }, 3000);
    }
  }, [submitted]);

  const onError = (errors: any) => {
    // your code here
    console.log('errors: ', errors);
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
    <main className="newContainer">
      {state.loggedInUser?.role === 'client' && !isLoading ? (
        <header
          className="mb-10 bg-center bg-cover"
          style={{ backgroundImage: 'url(/images/signup-bg.jpg)' }}>
          <div className="max-w-7xl lg:px-8 p-4 px-6 mx-auto text-black">
            <div className="md:items-center md:pb-16 md:pt-20 flex justify-center gap-6 py-8 mx-auto text-center">
              <div className=" md:py-16 md:mx-8 border-dse-peach bg-dse-peach md:bg-opacity-0 py-8 bg-opacity-50 border border-solid">
                <h1 className="font-display text-small md:text-3xl font-normal leading-tight tracking-widest uppercase">
                  Welcome to Downey Street Events!<br></br>We&apos;re so excited
                  to start planning your big day.
                </h1>
                <h2 className="font-display md:text-base tracking-extrawide lining-nums pt-4 pb-4 text-xs font-normal leading-tight uppercase">
                  To get started, please complete the information below
                </h2>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className="bg-white shadow">
          <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
            <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
              Edit Wedding Details
            </h1>
          </div>
        </header>
      )}

      {isLoading ? (
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
      ) : !submitted ? (
        <section className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div
              className={`mt-10 ${
                state.loggedInUser?.role !== 'client' ? 'visible' : 'hidden'
              } `}>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="md:px-0 px-4">
                    <h3 className="font-display tracking-extrawide lining-nums text-base font-normal leading-tight uppercase">
                      Admin Info
                    </h3>
                    <p className="mt-1 font-serif text-sm">
                      Input Admin information here
                    </p>
                  </div>
                </div>
                <div className="md:mt-0 md:col-span-2 mt-5">
                  <div className=" overflow-hidden">
                    <div className="md:p-0 p-4">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="sm:col-span-6 col-span-6">
                          {errors.ADMIN_INFO?.PLANNER ? (
                            <p className="text-red-500">
                              {/* @ts-ignore */}
                              {errors.ADMIN_INFO?.PLANNER.message}
                            </p>
                          ) : (
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="PLANNER">
                              Planner
                            </label>
                          )}

                          <select
                            {...register('ADMIN_INFO.PLANNER', {
                              required: 'Planner required.',
                            })}
                            className="border-dse-peach focus:outline-none focus:ring-transparent focus:border-dse-orange w-full px-3 py-2 mt-1 font-serif text-sm bg-white border"
                            id="PLANNER">
                            {planners?.map((planner: Planner, id: number) => (
                              <option value={`${planner.name}`} key={id}>
                                {planner.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* <div className="sm:col-span-6 col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="AMMEND">
                            Amendments
                          </label>
                          <textarea
                            {...register('ADMIN_INFO.AMMEND')}
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            id="AMMEND"></textarea>
                        </div> */}
                        <div className="sm:col-span-4 flex items-start col-span-6">
                          <div className="flex items-center h-5">
                            <input
                              {...archivedField}
                              id="ARCHIVED"
                              name="ARCHIVED"
                              type="checkbox"
                              checked={archivedField.value}
                              onChange={archivedField.onChange}
                              onBlur={archivedField.onBlur}
                              value="true"
                              ref={archivedField.ref}
                              className="focus:ring-transparent text-dse-orange w-4 h-4 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="ARCHIVED">
                              Archived
                            </label>
                            <p className="font-serif text-sm">
                              Archived clients will not show on main client page
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:visible" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200"></div>
                </div>
              </div>
            </div>

            <div
              className={`mt-10 sm:mt-0 ${
                state.loggedInUser?.role !== 'client' ? 'visible' : 'hidden'
              } `}>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="md:px-0 px-4">
                    <h3 className="font-display tracking-extrawide lining-nums text-base font-normal leading-tight uppercase">
                      Event Details
                    </h3>
                    <p className="mt-1 font-serif text-sm">
                      Set the day-of event details here
                    </p>
                  </div>
                </div>
                <div className="md:mt-0 md:col-span-2 mt-5">
                  <div className=" overflow-hidden">
                    <div className="md:p-0 p-4">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="sm:col-span-6 col-span-6">
                          {errors.EVENT_DETAILS?.WED_MONTH ? (
                            <p className="text-red-500">
                              {errors.EVENT_DETAILS?.WED_MONTH.message}
                            </p>
                          ) : (
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="WED_MONTH">
                              Wedding date
                            </label>
                          )}
                          <div className=" flex justify-between w-full">
                            <select
                              {...register('EVENT_DETAILS.WED_MONTH', {
                                // required: 'Wedding date required.',
                              })}
                              id="WED_MONTH"
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach lining-nums w-3/12 px-3 py-2 mt-1 font-serif text-sm">
                              {months.map((month, id) => (
                                <option value={month.value} key={id}>
                                  {month.label}
                                </option>
                              ))}
                            </select>
                            <select
                              {...register('EVENT_DETAILS.WED_DAY', {
                                // required: 'First name required.',
                              })}
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach lining-nums w-3/12 px-3 py-2 mt-1 font-serif text-sm">
                              {days.map((day: any, id: number) => (
                                <option value={day.value} key={id}>
                                  {day.label}
                                </option>
                              ))}
                            </select>
                            <select
                              {...register('EVENT_DETAILS.WED_YEAR', {
                                // required: 'First name required.',
                              })}
                              id="project_wedding_date_3i"
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach lining-nums w-3/12 px-3 py-2 mt-1 font-serif text-sm">
                              {years.map((year: any, id: number) => (
                                <option value={year.value} key={id}>
                                  {year.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="sm:col-span-2 col-span-6">
                          {errors.EVENT_DETAILS?.VENUE_NAME ? (
                            <p className="text-red-500">
                              {errors.EVENT_DETAILS?.VENUE_NAME.message}
                            </p>
                          ) : (
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="VENUE_NAME">
                              Venue name
                            </label>
                          )}
                          <input
                            {...register('EVENT_DETAILS.VENUE_NAME', {
                              // required: 'Venue name required.',
                            })}
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            id="VENUE_NAME"
                          />
                        </div>

                        <div className="sm:col-span-2 col-span-3">
                          {errors.EVENT_DETAILS?.VENUE_CITY ? (
                            <p className="text-red-500">
                              {errors.EVENT_DETAILS?.VENUE_CITY.message}
                            </p>
                          ) : (
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="VENUE_CITY">
                              Venue City
                            </label>
                          )}
                          <input
                            {...register('EVENT_DETAILS.VENUE_CITY', {
                              // required: 'Venue city required.',
                            })}
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            id="VENUE_CITY"
                          />
                        </div>

                        <div className="sm:col-span-2 col-span-3">
                          {errors.EVENT_DETAILS?.VENUE_STATE ? (
                            <p className="text-red-500">
                              {errors.EVENT_DETAILS?.VENUE_STATE.message}
                            </p>
                          ) : (
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="VENUE_CITY">
                              Venue State
                            </label>
                          )}
                          <input
                            {...register('EVENT_DETAILS.VENUE_STATE', {
                              // required: 'Venue state required.',
                            })}
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            id="VENUE_STATE"
                          />
                        </div>

                        <div className="sm:col-span-3 col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="GUEST_RANGE_START">
                            Guest range
                          </label>
                          <select
                            {...register('EVENT_DETAILS.GUEST_RANGE_START', {})}
                            className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            id="GUEST_RANGE_START">
                            {guestRange.map((guest: any, id: number) => (
                              <option value={guest.value} key={id}>
                                {guest.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:col-span-3 col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="GUEST_RANGE_END">
                            Guest range end
                          </label>
                          <select
                            {...register('EVENT_DETAILS.GUEST_RANGE_END', {})}
                            className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            name="GUEST_RANGE_END"
                            id="GUEST_RANGE_END">
                            {guestRange.map((guest: any, id: number) => (
                              <option value={guest.value} key={id}>
                                {guest.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:visible" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200"></div>
                </div>
              </div>
            </div>

            <div
              className={`   ${
                state.loggedInUser?.role !== 'client' && 'sm:mt-0'
              } mt-10`}>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="md:px-0 px-4">
                    <h3 className="font-display tracking-extrawide lining-nums text-base font-normal leading-tight uppercase">
                      People
                    </h3>
                    <p className="mt-1 font-serif text-sm">
                      Please provide details about the lucky couple
                    </p>
                  </div>
                </div>
                <div className="md:mt-0 md:col-span-2 mt-5">
                  <div className=" overflow-hidden">
                    <div className="md:p-0 p-4">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="sm:col-span-3 grid grid-cols-6 col-span-6 gap-6">
                          <div className="col-span-6">
                            <h2 className="font-display tracking-extrawide text-base font-normal leading-tight uppercase">
                              Person A
                            </h2>
                          </div>
                          <div className="col-span-6">
                            {errors.PEOPLE?.P_A_FNAME ? (
                              <p className="text-red-500">
                                {errors.PEOPLE?.P_A_FNAME.message}
                              </p>
                            ) : (
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_A_FNAME">
                                First name
                              </label>
                            )}

                            <input
                              {...register('PEOPLE.P_A_FNAME', {
                                required: 'Person A name required.',
                              })}
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_A_FNAME"
                            />
                          </div>
                          <div className="col-span-6">
                            {errors.PEOPLE?.P_A_LNAME ? (
                              <p className="text-red-500">
                                {errors.PEOPLE?.P_A_LNAME.message}
                              </p>
                            ) : (
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_A_LNAME">
                                Last name
                              </label>
                            )}
                            <input
                              {...register('PEOPLE.P_A_LNAME', {
                                required: 'Person A name required.',
                              })}
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_A_LNAME"
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="P_A_ROLE">
                              Role
                            </label>
                            <select
                              {...register('PEOPLE.P_A_ROLE', {})}
                              className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              id="P_A_ROLE">
                              <option value="bride">Bride</option>
                              <option value="groom">Groom</option>
                              <option value="client">Client</option>
                            </select>
                          </div>
                          <div className="col-span-6">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="P_A_PHONE">
                              Phone
                            </label>
                            <input
                              {...register('PEOPLE.P_A_PHONE', {})}
                              placeholder=""
                              className="w-100 focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_A_PHONE"
                            />
                          </div>
                          <div className="col-span-6">
                            {errors.PEOPLE?.P_A_EMAIL ? (
                              <p className="text-red-500">
                                {errors.PEOPLE?.P_A_EMAIL.message}
                              </p>
                            ) : (
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_A_EMAIL">
                                Email
                              </label>
                            )}

                            <input
                              {...register('PEOPLE.P_A_EMAIL', {
                                required: 'Please provide an email address',
                              })}
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_A_EMAIL"
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="P_A_ADD1">
                              Address 1
                            </label>
                            <input
                              {...register('PEOPLE.P_A_ADD1', {})}
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_A_ADD1"
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="P_A_ADD2">
                              Address 2
                            </label>
                            <input
                              {...register('PEOPLE.P_A_ADD2', {})}
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_A_ADD2"
                            />
                          </div>
                          <div className="grid grid-cols-3 col-span-6">
                            <div className="col-span-1">
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_A_CITY">
                                City
                              </label>
                              <input
                                {...register('PEOPLE.P_A_CITY', {})}
                                placeholder=""
                                className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                                type="text"
                                id="P_A_CITY"
                              />
                            </div>
                            <div className="col-span-1 px-3">
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_A_STATE">
                                State
                              </label>
                              <input
                                {...register('PEOPLE.P_A_STATE', {})}
                                placeholder=""
                                className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                                type="text"
                                id="P_A_STATE"
                              />
                            </div>
                            <div className="col-span-1">
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_A_ZIP">
                                Postal code
                              </label>
                              <input
                                {...register('PEOPLE.P_A_ZIP', {})}
                                placeholder=""
                                className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                                type="text"
                                id="P_A_ZIP"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-3 grid grid-cols-6 col-span-6 gap-6">
                          <div className="col-span-6">
                            <h2 className="font-display tracking-extrawide text-base font-normal leading-tight uppercase">
                              Person B
                            </h2>
                          </div>
                          <div className="col-span-6">
                            {errors.PEOPLE?.P_B_FNAME ? (
                              <p className="text-red-500">
                                {errors.PEOPLE?.P_B_FNAME.message}
                              </p>
                            ) : (
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_B_FNAME">
                                First name
                              </label>
                            )}
                            <input
                              {...register('PEOPLE.P_B_FNAME', {
                                required: 'Person B name required.',
                              })}
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_B_FNAME"
                            />
                          </div>
                          <div className="col-span-6">
                            {errors.PEOPLE?.P_B_LNAME ? (
                              <p className="text-red-500">
                                {errors.PEOPLE?.P_B_LNAME.message}
                              </p>
                            ) : (
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_B_LNAME">
                                Last name
                              </label>
                            )}
                            <input
                              {...register('PEOPLE.P_B_LNAME', {
                                required: 'Person B name required.',
                              })}
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_B_LNAME"
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="P_B_ROLE">
                              Role
                            </label>
                            <select
                              {...register('PEOPLE.P_B_ROLE', {})}
                              className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              id="P_B_ROLE">
                              <option value="bride">Bride</option>
                              <option value="groom">Groom</option>
                              <option value="client">Client</option>
                            </select>
                          </div>
                          <div className="col-span-6">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="P_B_PHONE">
                              Phone
                            </label>
                            <input
                              {...register('PEOPLE.P_B_PHONE', {})}
                              placeholder=""
                              className="w-100 focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_B_PHONE"
                            />
                          </div>
                          <div className="col-span-6">
                            {errors.PEOPLE?.P_B_EMAIL ? (
                              <p className="text-red-500">
                                {errors.PEOPLE?.P_B_EMAIL.message}
                              </p>
                            ) : (
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_B_EMAIL">
                                Email
                              </label>
                            )}

                            <input
                              {...register('PEOPLE.P_B_EMAIL')}
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_B_EMAIL"
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="P_B_ADD1">
                              Address 1
                            </label>
                            <input
                              {...register('PEOPLE.P_B_ADD1', {})}
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_B_ADD1"
                            />
                          </div>
                          <div className="col-span-6">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="P_B_ADD2">
                              Address 2
                            </label>
                            <input
                              {...register('PEOPLE.P_B_ADD2', {})}
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              id="P_B_ADD2"
                            />
                          </div>
                          <div className="grid grid-cols-3 col-span-6">
                            <div className="col-span-1">
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_B_CITY">
                                City
                              </label>
                              <input
                                {...register('PEOPLE.P_B_CITY', {})}
                                placeholder=""
                                className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                                type="text"
                                id="P_B_CITY"
                              />
                            </div>
                            <div className="col-span-1 px-3">
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_B_STATE">
                                State
                              </label>
                              <input
                                {...register('PEOPLE.P_B_STATE', {})}
                                placeholder=""
                                className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                                type="text"
                                id="P_B_STATE"
                              />
                            </div>
                            <div className="col-span-1">
                              <label
                                className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                                htmlFor="P_B_ZIP">
                                Postal code
                              </label>
                              <input
                                {...register('PEOPLE.P_B_ZIP', {})}
                                placeholder=""
                                className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                                type="text"
                                id="P_B_ZIP"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:visible" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200"></div>
                </div>
              </div>
            </div>
            <div className={`mt-10 sm:mt-0  `}>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="md:px-0 px-4">
                    <h3 className="font-display tracking-extrawide lining-nums text-base font-normal leading-tight uppercase">
                      Site Settings
                    </h3>
                    <p className="mt-1 font-serif text-sm">
                      Configure how the planning site works
                    </p>
                  </div>
                </div>
                <div className="md:mt-0 md:col-span-2 mt-5">
                  <div className=" overflow-hidden">
                    <div className="md:p-0 p-4">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_cover_url">
                            Primary Background Image
                          </label>
                        </div>

                        {bgImages.map((image, id) => (
                          <label
                            key={id}
                            className={`sm:col-span-3 ${
                              selectedBgImageId == image.id
                                ? 'border-[rgb(217,142,72)]'
                                : 'border-transparent'
                            } col-span-6 border-8 `}>
                            <input
                              type="radio"
                              className="hidden"
                              // value={image.id}
                              checked={selectedBgImageId === image.id}
                              onChange={() => handleBgImageSelect(image.id)}
                            />
                            <img src={image.url} alt={image.alt} />
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:visible" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200"></div>
                </div>
              </div>
            </div>
            <div
              className={`mt-10 sm:mt-0 ${
                state.loggedInUser?.role !== 'client' ? 'visible' : 'hidden'
              } `}>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="md:px-0 px-4">
                    <h3 className="font-display tracking-extrawide lining-nums text-base font-normal leading-tight uppercase">
                      Planning Links
                    </h3>
                    <p className="mt-1 font-serif text-sm">
                      Save planning links for the client&apos;s dashboard here
                    </p>
                  </div>
                </div>
                <div className="md:mt-0 md:col-span-2 mt-5">
                  <div className=" overflow-hidden">
                    <div className="md:p-0 p-4">
                      <div className="grid grid-cols-6 gap-6">
                        {[
                          // 'WORKFLOW',

                          'Workflow_+_Budget_+_Payment',
                          // 'ADDRESS',
                          'DESIGN_BOARD',
                          'CLIENT_DOCS',
                          'VENDOR_PROPOSALS',
                          // 'VENDOR_CONTACT',
                          'GUEST_INFO',
                          // 'CALENDAR',
                        ].map((title, id) => (
                          <div key={id} className="sm:col-span-3 col-span-6">
                            {/* @ts-ignore */}
                            {errors?.PLANNING_LINKS?.[`${title}_URL`] ? (
                              <span className="text-red-500 text-sm">
                                {/* @ts-ignore */}
                                {errors.PLANNING_LINKS[`${title}_URL`].message}
                              </span>
                            ) : (
                              <label className="text-[12px] tracking-widewide font-sans font-normal uppercase">
                                {title.split('_').join(' ')} url
                              </label>
                            )}

                            <input
                              {...register(
                                // @ts-ignore
                                `PLANNING_LINKS.${title}_URL`

                                // // check if the url is valid
                                // {
                                //   pattern: {
                                //     // make it so it accepts links with or without http(s):// but needs www.
                                //     value:
                                //       /^(https?:\/\/)(www\.)[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
                                //     message: 'Please enter a valid URL',
                                //   },
                                // }
                              )}
                              placeholder={`${title
                                .split('_')
                                .join(' ')
                                .toLowerCase()}`}
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm placeholder:capitalize"
                              type="text"
                              id={`${title}_URL`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:visible" aria-hidden="true">
                <div className="py-5">
                  <div className="border-t border-gray-200"></div>
                </div>
              </div>
            </div>

            <div className="sm:mt-0 mt-10 mb-20">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="md:px-0 px-4">
                    <h3 className="font-display tracking-extrawide lining-nums text-base font-normal leading-tight uppercase">
                      Public Links
                    </h3>
                    <p className="mt-1 font-serif text-sm">
                      Please share the sites you are using for your planning or
                      service
                    </p>
                  </div>
                </div>
                <div className="md:mt-0 md:col-span-2 mt-5">
                  <div className=" overflow-hidden">
                    <div className="md:p-0 p-4">
                      <div className="grid grid-cols-6 gap-6">
                        {[
                          'PINTEREST',
                          'FACEBOOK',
                          'INSTAGRAM',
                          'TWITTER',
                          'YELP',
                          'REGISTRY',
                        ].map((title, id) => (
                          <div key={id} className="sm:col-span-3 col-span-6">
                            {/* @ts-ignore */}
                            {errors?.PUBLIC_LINKS?.[`${title}_URL`] ? (
                              <span className="text-red-500 text-sm">
                                {/* @ts-ignore */}
                                {errors.PUBLIC_LINKS[`${title}_URL`].message}
                              </span>
                            ) : (
                              <label className="text-[12px]  tracking-widewide font-sans font-normal uppercase">
                                {title} url
                              </label>
                            )}
                            <input
                              // @ts-ignore
                              {...register(`PUBLIC_LINKS.${title}_URL`, {
                                // pattern: {
                                //   // make it so it accepts links https://www.npmjs.com/package/react-pdf or http://www.react-pdf.org/ or https://drive.google.com/drive/u/1/folders/1NCzyNwCQXEKwOrx63QaBnGv8kwBe9eCH
                                //   value:
                                //     /^(https?:\/\/)(www\.)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i,
                                //   message: 'Please enter a valid URL',
                                // },
                              })}
                              placeholder={`${title.toLowerCase()}`}
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm placeholder:capitalize"
                              type="text"
                              id={`${title}_URL`}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="md:px-0 px-4 py-3 gap-4 flex justify-end text-right">
                        <button
                          type="button"
                          onClick={() => {
                            // go back to homepage
                            router.push(
                              `/clients/${state.loggedInUser?.name.replace(
                                ' + ',
                                '-'
                              )}`
                            );
                          }}
                          className="md:py-2 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer">
                          Back
                        </button>
                        <button
                          type="submit"
                          name="commit"
                          className="md:py-2 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer">
                          {state.loggedInUser?.role == 'planner' &&
                          urlParameter == null
                            ? 'Create'
                            : 'Update'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </section>
      ) : (
        <div
          className="h-1/3 opacity-90 rounded-xl fixed inset-0 z-10 flex flex-col w-1/3 p-4 m-auto bg-white border-4 border-gray-300"
          id="successModal">
          <p className="m-auto text-xl text-center">
            {state.loggedInUser?.role != 'client'
              ? 'Successful creation. Please wait while we redirect you to the homepage.'
              : 'Successful update. Please wait while we redirect you to your portal.'}
          </p>
          <svg
            aria-hidden="true"
            className="animate-spin fill-[#e7c8c0] mx-auto w-1/3 h-1/3 text-gray-300"
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
      )}
    </main>
  );
};

export default Page;
