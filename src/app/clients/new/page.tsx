'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import planners from '../../../data/planners.json';
import {
  days,
  months,
  years,
  guestRange,
  bgImages,
} from '../../../../constants/NEW_CLIENT_CONSTS';
import { useStateContext } from '../../../../context/StateContext';
type Props = {};

const Page = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      ADMIN_INFO: {
        PLANNER: '',
        AMMEND: '',
        ARCHIVED: false,
      },
      EVENT_DETAILS: {
        DATE: '',
        WED_MONTH: '',
        WED_DAY: '',
        WED_YEAR: '',
        VENUE_NAME: '',
        VENUE_CITY: '',
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
      PLANNING_LINKS: {},
      PUBLIC_LINKS: {},
    },
  });

  const [selectedBgImageId, setSelectedBgImageId] = React.useState(0);
  const { state } = useStateContext();

  const handleBgImageSelect = (id: number) => {
    setSelectedBgImageId(id);
    console.log('selected', id);
  };

  const onSubmit = async (data: Record<string, any>) => {
    data.plannerName = data.ADMIN_INFO.PLANNER;
    data.SITE_INFO.BG_IMAGE_ID = selectedBgImageId;
    console.log('submitted', data);

    fetch('/api/newClient', {
      method: 'POST',
      body: JSON.stringify(data),

      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('returned data', data);
      });

    // window.scrollTo(0, 0);
  };

  const onError = (errors: any) => {
    // your code here
    console.log('errors: ', errors);
  };

  return (
    <main className="newContainer">
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            Edit Wedding Details
          </h1>
        </div>
      </header>
      <section className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="mt-10">
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
                            {errors.ADMIN_INFO.PLANNER.message}
                          </p>
                        ) : (
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="PLANNER">
                            Planner
                          </label>
                        )}

                        <select
                          className="border-dse-peach focus:outline-none focus:ring-transparent focus:border-dse-orange w-full px-3 py-2 mt-1 font-serif text-sm bg-white border"
                          {...register('ADMIN_INFO.PLANNER', {
                            required: 'Planner required.',
                          })}
                          id="PLANNER">
                          {planners.map((planner, id) => (
                            <option
                              value={`${planner.firstName} ${planner.lastName}`}
                              key={id}>
                              {planner.firstName} {planner.lastName}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="sm:col-span-6 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="AMMEND">
                          Amendments
                        </label>
                        <textarea
                          {...register('ADMIN_INFO.AMMEND')}
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          id="AMMEND"></textarea>
                      </div>
                      <div className="sm:col-span-4 flex items-start col-span-6">
                        <div className="flex items-center h-5">
                          <input
                            {...register('ADMIN_INFO.ARCHIVED')}
                            id="ARCHIVED"
                            name="ARCHIVED"
                            type="checkbox"
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
          </div>
          <div className="sm:visible" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>

          <div className="sm:mt-0 mt-10">
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
                            className="text-xxs tracking-extrawide font-sans font-normal uppercase"
                            htmlFor="WED_MONTH">
                            Wedding date
                          </label>
                        )}
                        <div className=" flex justify-between w-full">
                          <select
                            {...register('EVENT_DETAILS.WED_MONTH', {
                              required: 'Wedding date required.',
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
                              required: 'First name required.',
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
                              required: 'First name required.',
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

                      <div className="sm:col-span-3 col-span-6">
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
                            required: 'Venue name required.',
                          })}
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          id="VENUE_NAME"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
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
                            required: 'Venue city required.',
                          })}
                          placeholder=""
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          id="VENUE_CITY"
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
          </div>
          <div className="sm:visible" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          <div className="sm:mt-0 mt-10">
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
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="P_A_FNAME">
                            First name
                          </label>
                          <input
                            {...register('PEOPLE.P_A_FNAME', {
                              required: 'Venue name required.',
                            })}
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            id="P_A_FNAME"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="P_A_LNAME">
                            Last name
                          </label>
                          <input
                            {...register('PEOPLE.P_A_LNAME', {
                              required: 'Venue name required.',
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
                            name="P_A_PHONE"
                            id="P_A_PHONE"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="P_A_EMAIL">
                            Email
                          </label>
                          <input
                            {...register('PEOPLE.P_A_EMAIL', {})}
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
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="P_B_FNAME">
                            First name
                          </label>
                          <input
                            {...register('PEOPLE.P_B_FNAME', {})}
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            id="P_B_FNAME"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="P_B_LNAME">
                            Last name
                          </label>
                          <input
                            {...register('PEOPLE.P_B_LNAME', {})}
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
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="P_B_EMAIL">
                            Email
                          </label>
                          <input
                            {...register('PEOPLE.P_B_EMAIL', {})}
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
          </div>
          <div className="sm:visible" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          <div className="sm:mt-0 mt-10">
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
                      {/* <div className="col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_url">
                          URL for client
                        </label>
                        <div className=" flex mt-1">
                          <span className="focus:ring-transparent focus:border-dse-orange border-dse-peach bg-dse-peach inline-flex items-center px-3 mt-1 font-serif text-sm text-gray-500 border border-r-0">
                            planning.downeystreetevents.com/
                          </span>
                          <input
                            placeholder="jesse-and-james"
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[url]"
                            id="project_url"
                          />
                        </div>
                      </div> */}
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="SITE_PASSCODE">
                          Site Passcode
                        </label>
                        <input
                          {...register('SITE_INFO.SITE_PASSCODE')}
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="password"
                          id="SITE_PASSCODE"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="SITE_PASSCODE_CONFIRMATION">
                          Site Passcode Confirmation
                        </label>
                        <input
                          {...register('SITE_INFO.SITE_PASSCODE_CONFIRMATION')}
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="password"
                          id="SITE_PASSCODE_CONFIRMATION"
                        />
                      </div>

                      <div className="col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_cover_url">
                          Primary Background Image
                        </label>
                      </div>

                      {bgImages.map((image, id) => (
                        // <div
                        //   className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        //   key={image.id}>
                        //   <img src={image.url} alt={image.alt} />
                        // </div>
                        <label
                          key={id}
                          className="sm:col-span-3 col-span-6 border-4 border-transparent">
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
          </div>
          <div className="sm:visible" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          <div className="sm:mt-0 mt-10">
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
                        'workflow',
                        'budget',
                        'address',
                        'design Board',
                        'client Docs',
                        'vendor Proposals',
                        'vendor Contact',
                        'guest Info',
                        'calendar',
                      ].map((title, id) => (
                        <div key={id} className="sm:col-span-3 col-span-6">
                          <label className="text-[12px] tracking-widewide font-sans font-normal uppercase">
                            {title} url
                          </label>
                          <input
                            {...register(
                              // @ts-ignore
                              `PLANNING_LINKS.${title.split(' ')[0]}_url`
                            )}
                            placeholder={`${title}`}
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm capitalize"
                            type="text"
                            id={`${title}_url`}
                          />
                        </div>
                      ))}
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
                        'pinterest',
                        'facebook',
                        'instagram',
                        'website',
                        'blog',
                        'registry',
                      ].map((title, id) => (
                        <div key={id} className="sm:col-span-3 col-span-6">
                          <label className="text-[12px]  tracking-widewide font-sans font-normal uppercase">
                            {title} url
                          </label>
                          <input
                            // @ts-ignore
                            {...register(`PUBLIC_LINKS.${title}_url`)}
                            placeholder={`${title} url`}
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            id={`${title}_url`}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="md:px-0 px-4 py-3 text-right">
                      <input
                        type="submit"
                        name="commit"
                        value="Create Project"
                        className="md:py-2 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Page;
