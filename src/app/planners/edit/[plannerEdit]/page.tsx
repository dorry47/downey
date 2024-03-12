'use client';
import React, { use, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useClient } from '../../../../../lib/useClient';
import { useStateContext } from '../../../../../context/StateContext';

type Props = {};

const Page = (props: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const [plannerData, setPlannerData] = useState<any>({
    id: '',
    name: '',
    email: '',
    phone: '',
    archived: false,
    address: '',
  });
  const pathName = usePathname();
  const router = useRouter();
  const supabase = useClient();
  const { state, setState } = useStateContext();

  const plannerSlug = pathName.split('/planners/edit/')[1];

  const formattedSlug = plannerSlug.replace(/-/g, ' ');
  const capitalizeSlug = (slug: string) => {
    return slug
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const formattedAndCapitalizedSlug = capitalizeSlug(formattedSlug);
  console.log('split slug into name', `${formattedSlug}`);

  // const capitalizeSlug = (slug: string) => {
  //   return slug
  //     .split(' ')
  //     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //     .join(' ');
  // };

  const fetchPlannerData = async () => {
    let { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('name', formattedAndCapitalizedSlug)
      .in('role', ['planner', 'stylist']);

    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ROLE: '',
      FNAME: '',
      LNAME: '',
      EMAIL: '',
      PHONE: '',
      ARCHIVED: false,
      ADDRESS: '',
    },
  });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') as string);
    const user = JSON.parse(localStorage.getItem('user') as string);
    fetchPlannerData().then((data: any) => {
      setPlannerData(data[0]);
    });

    if (session) {
      setState({ ...state, session, user });
    }
  }, []);

  useEffect(() => {
    console.log('planner data', plannerData);
  }, [plannerData]);

  useEffect(() => {
    const { name, email, phone, archived, address, role } = plannerData || {};
    const firstName = name?.split(' ')[0];
    const lastName = name?.split(' ')[1];

    console.log('planner data', plannerData);

    if (plannerData) {
      setValue('ROLE', role || 'planner');
      setValue('FNAME', firstName);
      setValue('LNAME', lastName);
      setValue('EMAIL', email);
      setValue('PHONE', phone);
      setValue('ARCHIVED', archived);
      setValue('ADDRESS', address);
    }
  }, [plannerData]);

  const onSubmit = async (data: Record<string, any>) => {
    const { FNAME, LNAME, EMAIL, PHONE, ARCHIVED, ADDRESS, ROLE } = data;

    fetch('/api/editPlanner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: EMAIL,
        name: `${FNAME} ${LNAME}`,
        phone: PHONE,
        address: ADDRESS,
        archived: ARCHIVED,
        role: ROLE,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        reset();
        setSubmitted(true);

        console.log('returned data', data);
      });

    // window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (submitted) {
      console.log('redirecting to clients page');
      setTimeout(() => {
        router.push(`/planners`);
      }, 3000);
    }
  }, [submitted]);

  const onError = (errors: any) => {
    // your code here
    console.log(errors);
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            {plannerSlug == 'new' ? 'New Planner' : 'Edit Planner'}
          </h1>
        </div>
      </header>
      <section className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="mt-10">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="sm:px-0 px-4">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Planner Info
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Input planner information here
                  </p>
                </div>
              </div>
              <div className="md:mt-0 md:col-span-2 mt-5">
                <div className="sm:rounded-md overflow-hidden shadow">
                  <div className="sm:p-6 px-4 py-5 bg-white">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="sm:col-span-6 col-span-6">
                        {errors.FNAME ? (
                          <p className="text-red-600">
                            {errors.FNAME.message as string}
                          </p>
                        ) : (
                          <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="ROLE">
                            Role
                          </label>
                        )}
                        <select
                          className="focus:ring-indigo-500 border-[1px] py-[0.75rem] px-[0.5rem] focus:border-indigo-500 sm:text-sm block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                          {...register('ROLE', {
                            required: 'Role required.',
                          })}
                          id="ROLE">
                          <option value="planner">Planner</option>
                          <option value="stylist">Stylist</option>
                        </select>
                      </div>

                      <div className="sm:col-span-3 col-span-6">
                        {errors.FNAME ? (
                          <p className="text-red-600">
                            {errors.FNAME.message as string}
                          </p>
                        ) : (
                          <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="user_first_name">
                            First name
                          </label>
                        )}
                        <input
                          className="focus:ring-indigo-500 border-[1px] py-[0.75rem] px-[0.5rem] focus:border-indigo-500 sm:text-sm block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                          type="text"
                          {...register('FNAME', {
                            required: 'First name required.',
                          })}
                          id="FNAME"></input>
                      </div>

                      <div className="sm:col-span-3 col-span-6">
                        {errors.LNAME ? (
                          <p className="text-red-600">
                            {errors.LNAME.message as string}
                          </p>
                        ) : (
                          <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="user_first_name">
                            Last name
                          </label>
                        )}
                        <input
                          className="focus:ring-indigo-500 border-[1px] py-[0.75rem] px-[0.5rem] focus:border-indigo-500 sm:text-sm block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                          type="text"
                          {...register('LNAME', {
                            required: 'Last name required.',
                          })}
                          id="user_last_name"
                        />
                      </div>

                      <div className="sm:col-span-6 col-span-6">
                        {errors.EMAIL ? (
                          <p className="text-red-600">
                            {errors.EMAIL.message as string}
                          </p>
                        ) : (
                          <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="user_first_name">
                            Email
                          </label>
                        )}
                        <input
                          className="focus:ring-indigo-500 border-[1px] py-[0.75rem] px-[0.5rem] focus:border-indigo-500 sm:text-sm block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                          type="text"
                          {...register('EMAIL', {
                            required: 'Email required.',
                          })}
                          id="user_email"
                        />
                      </div>
                      <div className="sm:col-span-6 col-span-6">
                        {errors.PHONE ? (
                          <p className="text-red-600">
                            {errors.PHONE.message as string}
                          </p>
                        ) : (
                          <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="user_first_name">
                            Phone
                          </label>
                        )}
                        <input
                          className="focus:ring-indigo-500 border-[1px] py-[0.75rem] px-[0.5rem] focus:border-indigo-500 sm:text-sm block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                          type="text"
                          {...register('PHONE', {
                            required: 'Phone number required.',
                          })}
                          id="user_phone"
                        />
                      </div>

                      <div className="sm:col-span-6 col-span-6">
                        {errors.ADDRESS ? (
                          <p className="text-red-600">
                            {errors.ADDRESS.message as string}
                          </p>
                        ) : (
                          <label
                            className="block text-sm font-medium text-gray-700"
                            htmlFor="user_first_name">
                            Full Address
                          </label>
                        )}
                        <textarea
                          className="focus:ring-indigo-500 py-[0.75rem] px-[0.5rem] focus:border-indigo-500 sm:text-sm block w-full mt-1 border-[1px] border-gray-300 rounded-md shadow-sm"
                          {...register('ADDRESS', {
                            required:
                              'Full address or contact information required.',
                          })}
                          id="ADDRESS"
                        />
                      </div>

                      <div className="sm:col-span-4 flex items-start col-span-6">
                        <div className="flex items-center h-5">
                          <input
                            className="focus:ring-indigo-500 w-4 h-4 text-indigo-600 border-gray-300 rounded"
                            type="checkbox"
                            {...register('ARCHIVED')}
                            id="user_archived"></input>
                        </div>
                        <div className="ml-3 text-sm">
                          <label
                            className="font-medium text-gray-700"
                            htmlFor="user_archived">
                            Archived
                          </label>
                          <p className="text-gray-500">
                            Archived planners (and thier clients) will not show
                            on main client page
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 sm:px-6 px-4 py-3 text-right">
                    <button
                      type="submit"
                      name="commit"
                      className="bg-[rgba(217,142,72)] hover:bg-[rgba(219,96,53)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex justify-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm">
                      {plannerSlug == 'new'
                        ? 'Create Planner'
                        : 'Update Planner'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        <Link href={`/planners/${plannerSlug}`}>
          <button
            type="button"
            className="bg-[rgba(219,96,53)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm">
            Show Planner
          </button>
        </Link>{' '}
        <Link href="/planners">
          <button
            type="button"
            className="bg-[rgba(219,96,53)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm">
            Back to Planners
          </button>
        </Link>
      </section>
      {submitted && (
        <div
          className="h-1/3 opacity-90 rounded-xl fixed inset-0 z-10 flex flex-col w-1/3 p-4 m-auto bg-white border-4 border-gray-300"
          id="successModal">
          <p className="m-auto text-xl text-center">
            Invite sent to the email listed. Redirecting back to the planners
            page.
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
    </>
  );
};

export default Page;
