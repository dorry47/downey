'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import planners from '../../../../data/planners.json';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {};

const page = (props: Props) => {
  const router = usePathname();
  const plannerSlug = router.split('/planners/edit/')[1];
  console.log(plannerSlug);

  const planner: any = planners.find((p: any) => p.slug === plannerSlug);

  const { firstName, lastName, email, phone, archived } = planner || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    archived: false,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUnregister: false,
    defaultValues: {
      FNAME: firstName,
      LNAME: lastName,
      EMAIL: email,
      PHONE: phone,
      ARCHIVED: archived,
    },
  });

  const onSubmit = async (data: Record<string, any>) => {
    console.log('submitted', data);

    const { FNAME, LNAME, EMAIL, PHONE, ARCHIVED } = data;

    fetch('/api/editPlanner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: EMAIL,
        name: `${FNAME} ${LNAME}`,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log('returned data', data));

    // window.scrollTo(0, 0);
  };

  const onError = (errors: any) => {
    // your code here
    console.log(errors);
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            Edit Planner
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
                          className="focus:ring-indigo-500 py-[0.75rem] px-[0.5rem] focus:border-indigo-500 sm:text-sm block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                          type="text"
                          {...register('FNAME', {
                            required: 'First name required.',
                          })}
                          id="user_first_name"></input>
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
                          className="focus:ring-indigo-500 py-[0.75rem] px-[0.5rem] focus:border-indigo-500 sm:text-sm block w-full mt-1 border-gray-300 rounded-md shadow-sm"
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
                          className="focus:ring-indigo-500 py-[0.75rem] px-[0.5rem] focus:border-indigo-500 sm:text-sm block w-full mt-1 border-gray-300 rounded-md shadow-sm"
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
                          className="focus:ring-indigo-500 py-[0.75rem] px-[0.5rem] focus:border-indigo-500 sm:text-sm block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                          type="text"
                          {...register('PHONE', {
                            required: 'Phone number required.',
                          })}
                          id="user_phone"
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
                      Update User
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
        <a href="/planners">
          <button
            type="button"
            className="bg-[rgba(219,96,53)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm">
            Back to Planners
          </button>
        </a>
      </section>
    </>
  );
};

export default page;
