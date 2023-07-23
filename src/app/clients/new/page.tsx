'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import planners from '../../../data/planners.json';

type Props = {};

const page = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      PLANNER: '',
    },
  });

  const onSubmit = async (data: Record<string, any>) => {
    console.log('submitted', data);
    // const res = await fetch('/api/editPlanner', {
    //   body: JSON.stringify(data),

    //   headers: {
    //     'Content-Type': 'application/json',
    //   },

    //   method: 'POST',
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     if (data.error) {
    //       console.log(data.error);
    //       const { title, detail } = data.error;
    //       setErrorMessage({
    //         title: title,
    //         detail: detail,
    //       });
    //     }
    //   });

    // window.scrollTo(0, 0);
  };

  const onError = (errors: any) => {
    // your code here
    console.log(errors);
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
                    Input Admin inhtmlFormation her /e
                  </p>
                </div>
              </div>
              <div className="md:mt-0 md:col-span-2 mt-5">
                <div className=" overflow-hidden">
                  <div className="md:p-0 p-4">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="sm:col-span-6 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_user_id">
                          Planner
                        </label>
                        <select
                          className="border-dse-peach focus:outline-none focus:ring-transparent focus:border-dse-orange w-full px-3 py-2 mt-1 font-serif text-sm bg-white border"
                          {...register('PLANNER', {
                            required: 'First name required.',
                          })}
                          id="project_user_id">
                          {planners.map((planner, id) => (
                            <option
                              value={`${planner.firstName} ${planner.lastName}`}
                              key={id}>
                              {planner.firstName} {planner.lastName}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* <div className="sm:col-span-4 flex items-start col-span-6"> */}
                      {/* <div className="flex items-center h-5">
                          <input
                            name="project[fixed_price]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="text-dse-peach border-dse-peach checked:border-dse-peach w-4 h-4 font-serif text-sm rounded cursor-pointer"
                            type="checkbox"
                            value="1"
                            name="project[fixed_price]"
                            id="project_fixed_price"
                          />
                        </div> */}
                      {/* <div className="ml-3 text-sm">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_fixed_price">
                            Percentage Pricing
                          </label>
                        </div> */}
                      {/* </div> */}
                      {/* <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_deposit">
                          Deposit
                        </label>
                        <div className=" flex mt-1">
                          <span className="focus:ring-transparent focus:border-dse-orange border-dse-peach bg-dse-peach inline-flex items-center px-3 mt-1 font-serif text-sm text-gray-500 border border-r-0">
                            $
                          </span>
                          <input
                            className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[deposit]"
                            id="project_deposit"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_deposit_url">
                          Deposit url
                        </label>
                        <input
                          placeholder="https://pay.stripe.com/invoice/xx"
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[deposit_url]"
                          id="project_deposit_url"
                        />
                      </div> */}
                      <div className="sm:col-span-6 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_amendments">
                          Amendments
                        </label>
                        <textarea
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          name="project[amendments]"
                          id="project_amendments"></textarea>
                      </div>
                      <div className="sm:col-span-4 flex items-start col-span-6">
                        <div className="flex items-center h-5">
                          <input
                            name="project[archived]"
                            type="hidden"
                            value="0"
                          />
                          <input
                            className="text-dse-peach border-dse-peach checked:border-dse-peach w-4 h-4 font-serif text-sm rounded cursor-pointer"
                            type="checkbox"
                            value="1"
                            name="project[archived]"
                            id="project_archived"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_archived">
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

          <div
            className="sm:mt-0 mt-10"
            data-controller="project"
            data-project-image-selected-className="border-dse-peach">
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
                        <label
                          className="text-xxs tracking-extrawide font-sans font-normal uppercase"
                          htmlFor="project_wedding_date">
                          Wedding date
                        </label>
                        <div className=" flex justify-between w-full">
                          <select
                            id="project_wedding_date_1i"
                            name="project[wedding_date(1i)]"
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach lining-nums w-3/12 px-3 py-2 mt-1 font-serif text-sm">
                            <option value="" label=" "></option>
                            <option value="2018">2018</option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                          </select>
                          <select
                            id="project_wedding_date_2i"
                            name="project[wedding_date(2i)]"
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach lining-nums w-3/12 px-3 py-2 mt-1 font-serif text-sm">
                            <option value="" label=" "></option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                          </select>
                          <select
                            id="project_wedding_date_3i"
                            name="project[wedding_date(3i)]"
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach lining-nums w-3/12 px-3 py-2 mt-1 font-serif text-sm">
                            <option value="" label=" "></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_venue_name">
                          Venue name
                        </label>
                        <input
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[venue_name]"
                          id="project_venue_name"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_venue_address">
                          Venue City
                        </label>
                        <input
                          placeholder=""
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[venue_address]"
                          id="project_venue_address"
                        />
                      </div>

                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_guest_range">
                          Guest range
                        </label>
                        <select
                          className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          name="project[guest_range]"
                          id="project_guest_range">
                          <option value="0">0</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="75">75</option>
                          <option value="100">100</option>
                          <option value="125">125</option>
                          <option value="150">150</option>
                          <option value="175">175</option>
                          <option value="200">200</option>
                          <option value="225">225</option>
                          <option value="250">250</option>
                          <option value="275">275</option>
                          <option value="300">300</option>
                          <option value="325">325</option>
                          <option value="350">350</option>
                          <option value="375">375</option>
                          <option value="400">400</option>
                          <option value="425">425</option>
                          <option value="450">450</option>
                          <option value="475">475</option>
                          <option value="500">500</option>
                          <option value="525">525</option>
                          <option value="550">550</option>
                          <option value="575">575</option>
                          <option value="600">600</option>
                          <option value="625">625</option>
                          <option value="650">650</option>
                          <option value="675">675</option>
                          <option value="700">700</option>
                          <option value="725">725</option>
                          <option value="750">750</option>
                        </select>
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_guest_range_end">
                          Guest range end
                        </label>
                        <select
                          className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          name="project[guest_range_end]"
                          id="project_guest_range_end">
                          <option value="0">0</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="75">75</option>
                          <option value="100">100</option>
                          <option value="125">125</option>
                          <option value="150">150</option>
                          <option value="175">175</option>
                          <option value="200">200</option>
                          <option value="225">225</option>
                          <option value="250">250</option>
                          <option value="275">275</option>
                          <option value="300">300</option>
                          <option value="325">325</option>
                          <option value="350">350</option>
                          <option value="375">375</option>
                          <option value="400">400</option>
                          <option value="425">425</option>
                          <option value="450">450</option>
                          <option value="475">475</option>
                          <option value="500">500</option>
                          <option value="525">525</option>
                          <option value="550">550</option>
                          <option value="575">575</option>
                          <option value="600">600</option>
                          <option value="625">625</option>
                          <option value="650">650</option>
                          <option value="675">675</option>
                          <option value="700">700</option>
                          <option value="725">725</option>
                          <option value="750">750</option>
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
          <div
            className="sm:mt-0 mt-10"
            data-controller="project"
            data-project-image-selected-className="border-dse-peach">
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
                            htmlFor="project_people_attributes_0_first_name">
                            First name
                          </label>
                          <input
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][0][first_name]"
                            id="project_people_attributes_0_first_name"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_0_last_name">
                            Last name
                          </label>
                          <input
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][0][last_name]"
                            id="project_people_attributes_0_last_name"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_0_role">
                            Role
                          </label>
                          <select
                            className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            name="project[people_attributes][0][role]"
                            id="project_people_attributes_0_role">
                            <option value="bride">Bride</option>
                            <option value="groom">Groom</option>
                            <option value="client">Client</option>
                          </select>
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_0_phone">
                            Phone
                          </label>
                          <input
                            placeholder=""
                            className="w-100 focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][0][phone]"
                            id="project_people_attributes_0_phone"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_0_email">
                            Email
                          </label>
                          <input
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][0][email]"
                            id="project_people_attributes_0_email"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_0_address_1">
                            Address 1
                          </label>
                          <input
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][0][address_1]"
                            id="project_people_attributes_0_address_1"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_0_address_2">
                            Address 2
                          </label>
                          <input
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][0][address_2]"
                            id="project_people_attributes_0_address_2"
                          />
                        </div>
                        <div className="grid grid-cols-3 col-span-6">
                          <div className="col-span-1">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="project_people_attributes_0_city">
                              City
                            </label>
                            <input
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              name="project[people_attributes][0][city]"
                              id="project_people_attributes_0_city"
                            />
                          </div>
                          <div className="col-span-1 px-3">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="project_people_attributes_0_state">
                              State
                            </label>
                            <input
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              name="project[people_attributes][0][state]"
                              id="project_people_attributes_0_state"
                            />
                          </div>
                          <div className="col-span-1">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="project_people_attributes_0_postal_code">
                              Postal code
                            </label>
                            <input
                              placeholder=""
                              className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              name="project[people_attributes][0][postal_code]"
                              id="project_people_attributes_0_postal_code"
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
                            htmlFor="project_people_attributes_1_first_name">
                            First name
                          </label>
                          <input
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][1][first_name]"
                            id="project_people_attributes_1_first_name"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_1_last_name">
                            Last name
                          </label>
                          <input
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][1][last_name]"
                            id="project_people_attributes_1_last_name"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_1_role">
                            Role
                          </label>
                          <select
                            className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            name="project[people_attributes][1][role]"
                            id="project_people_attributes_1_role">
                            <option value="bride">Bride</option>
                            <option value="groom">Groom</option>
                            <option value="client">Client</option>
                          </select>
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_1_phone">
                            Phone
                          </label>
                          <input
                            placeholder=""
                            className="w-100 focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][1][phone]"
                            id="project_people_attributes_1_phone"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_1_email">
                            Email
                          </label>
                          <input
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][1][email]"
                            id="project_people_attributes_1_email"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_1_address_1">
                            Address 1
                          </label>
                          <input
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][1][address_1]"
                            id="project_people_attributes_1_address_1"
                          />
                        </div>
                        <div className="col-span-6">
                          <label
                            className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                            htmlFor="project_people_attributes_1_address_2">
                            Address 2
                          </label>
                          <input
                            placeholder=""
                            className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                            type="text"
                            name="project[people_attributes][1][address_2]"
                            id="project_people_attributes_1_address_2"
                          />
                        </div>
                        <div className="grid grid-cols-3 col-span-6">
                          <div className="col-span-1">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="project_people_attributes_1_city">
                              City
                            </label>
                            <input
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              name="project[people_attributes][1][city]"
                              id="project_people_attributes_1_city"
                            />
                          </div>
                          <div className="col-span-1 px-3">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="project_people_attributes_1_state">
                              State
                            </label>
                            <input
                              placeholder=""
                              className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              name="project[people_attributes][1][state]"
                              id="project_people_attributes_1_state"
                            />
                          </div>
                          <div className="col-span-1">
                            <label
                              className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                              htmlFor="project_people_attributes_1_postal_code">
                              Postal code
                            </label>
                            <input
                              placeholder=""
                              className="lining-nums focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                              type="text"
                              name="project[people_attributes][1][postal_code]"
                              id="project_people_attributes_1_postal_code"
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
          <div className="sm: hidden" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          <div
            className="sm:mt-0 mt-10"
            data-controller="project"
            data-project-image-selected-className="border-dse-peach">
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
                          htmlFor="project_url">
                          URL htmlFor client
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
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_password">
                          Site Passcode
                        </label>
                        <input
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="password"
                          name="project[password]"
                          id="project_password"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_password_confirmation">
                          Site Passcode Confirmation
                        </label>
                        <input
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="password"
                          name="project[password_confirmation]"
                          id="project_password_confirmation"
                        />
                      </div>
                      <div className="hidden col-span-6">
                        <input
                          type="hidden"
                          name="project[cover_image]"
                          id="project_cover_image"
                        />
                      </div>
                      <div className="col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_cover_url">
                          Primary Background Image
                        </label>
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="1"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-1-c4ba2aa1f62783697aeb1b14da5c6bb77f33fed8bcf0289fa919870e6c3edeec.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="2"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-2-367ea581c3dfcca6c98316335a8ef42c0c8d158e4a38f4f22824b69624f12332.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="3"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-3-a2c565f0d2b06a13a31bcd32094eac2ce70ab6b422fc8b01a6fee9d4cf50bfa7.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="4"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-4-26b426e0c2c6865f43ca891f8bbd3a9c7a607d520a5059ac51a3490542cb1cb8.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="5"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-5-cb2a0b0a73247ac0f716fd08aa478d4d90b6ce9b6672cc7aa8325ce8f5ca780a.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="6"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-6-c0b02641e0dfeac727dfaa9af6413df094d9d9f8ff9686ee721ae8d2a99b5478.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="7"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-7-96e21e25fea49ea06538f334e8a5b7ef7b4edf6282932ebc635bbfd87fa5b089.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="8"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-8-7ebdf53fe41e5b0efab003b4e7a6c5b848a4137c5cedaa5492275b246fd41ce7.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="9"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-9-fc40902dcf5e017d2d27ff18a0a776667ecffbbb74efebe1f122bc6ef902714e.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="10"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-10-956d8de47062998b50be5d42950573275481b0b2aac7e841228e2807f50a3aee.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="11"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-11-4081509aefd0af25118da5c1627266c01b8eff42ccd29945fcb2512d22f49cde.jpg" />
                      </div>
                      <div
                        className="sm:col-span-3 col-span-6 border-4 border-transparent"
                        data-project-target="projectImage"
                        data-project-image-value="12"
                        data-action="click->project#image_select">
                        <img src="/assets/client-banner-12-da62021b2c5a93be58bf89da0f717c7c56cf97c6d0303d33aebf8379287e941a.jpg" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sm: hidden" aria-hidden="true">
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
                    Save planning links htmlFor the client's dashboard here
                  </p>
                </div>
              </div>
              <div className="md:mt-0 md:col-span-2 mt-5">
                <div className=" overflow-hidden">
                  <div className="md:p-0 p-4">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_workflow_url">
                          Workflow url
                        </label>
                        <input
                          placeholder="[Google htmlForm]"
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[workflow_url]"
                          id="project_workflow_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_budget_url">
                          Budget url
                        </label>
                        <input
                          placeholder="[Google Folder]"
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[budget_url]"
                          id="project_budget_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_address_url">
                          Address url
                        </label>
                        <input
                          placeholder="[Google Spreadsheet]"
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[address_url]"
                          id="project_address_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_design_board_url">
                          Design board url
                        </label>
                        <input
                          placeholder="[Google Folder]"
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[design_board_url]"
                          id="project_design_board_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_client_docs_url">
                          Client docs url
                        </label>
                        <input
                          placeholder="[Google Folder]"
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[client_docs_url]"
                          id="project_client_docs_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_vendor_proposals_url">
                          Vendor proposals url
                        </label>
                        <input
                          placeholder="[Google Folder]"
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[vendor_proposals_url]"
                          id="project_vendor_proposals_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_vendor_contact_url">
                          Vendor contact url
                        </label>
                        <input
                          placeholder="[Google Folder]"
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[vendor_contact_url]"
                          id="project_vendor_contact_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_guest_info_url">
                          Guest info url
                        </label>
                        <input
                          placeholder="[Google Folder]"
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[guest_info_url]"
                          id="project_guest_info_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_calendar_address">
                          Calendar address
                        </label>
                        <input
                          placeholder="[Google Calendar Address]"
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[calendar_address]"
                          id="project_calendar_address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm: hidden" aria-hidden="true">
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
                    Please share the sites you are using htmlFor your planning
                    or service
                  </p>
                </div>
              </div>
              <div className="md:mt-0 md:col-span-2 mt-5">
                <div className=" overflow-hidden">
                  <div className="md:p-0 p-4">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_pinterest_url">
                          Pinterest url
                        </label>
                        <input
                          placeholder=""
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[pinterest_url]"
                          id="project_pinterest_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_facebook_url">
                          Facebook url
                        </label>
                        <input
                          placeholder=""
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[facebook_url]"
                          id="project_facebook_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_instagram_url">
                          Instagram url
                        </label>
                        <input
                          placeholder=""
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[instagram_url]"
                          id="project_instagram_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_website_url">
                          Website url
                        </label>
                        <input
                          placeholder=""
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[website_url]"
                          id="project_website_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_blog_url">
                          Blog url
                        </label>
                        <input
                          placeholder=""
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[blog_url]"
                          id="project_blog_url"
                        />
                      </div>
                      <div className="sm:col-span-3 col-span-6">
                        <label
                          className="text-[12px] tracking-widewide font-sans font-normal uppercase"
                          htmlFor="project_registry_url">
                          Registry url
                        </label>
                        <input
                          placeholder=""
                          className="focus:ring-transparent focus:border-dse-orange border-dse-peach w-full mt-1 font-serif text-sm"
                          type="text"
                          name="project[registry_url]"
                          id="project_registry_url"
                        />
                      </div>
                    </div>
                    <div className="md:px-0 px-4 py-3 text-right">
                      <input
                        type="submit"
                        name="commit"
                        value="Create Project"
                        className="md:py-2 text-small md:text-xs bg-dse-gold hover:bg-dse-orange md:w-auto inline-flex justify-center w-full px-4 py-4 font-medium tracking-widest text-white uppercase border border-transparent cursor-pointer"
                        data-disable-with="Create Project"
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

export default page;
