'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PlannerRow from '../../../components/PlannerRow';
import Link from 'next/link';
import { useClient } from '../../../lib/useClient';
import { useStateContext } from '../../../context/StateContext';

type Props = {};

interface Planner {
  name: string;
  email: string;
  phone: string;
  archived: boolean;
  slug: string;
}

export default function Page(props: Props) {
  const supabase = useClient();
  const { state, setState } = useStateContext();

  const fetchPlannerData = async () => {
    let { data, error } = await supabase
      .from('users')
      .select('*')
      .in('role', ['planner', 'stylist']);

    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  const { data: plannerData } = useQuery({
    queryKey: ['plannerData'],
    queryFn: fetchPlannerData,
  });

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') as string);
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (session) {
      setState({ ...state, session, user });
    }
  }, []);

  return (
    <div className="">
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            Planners
          </h1>
        </div>
      </header>
      <section className="max-w-7xl px-6 py-8 mx-auto overflow-auto break-words">
        <div className="w-[1200px] flex flex-col">
          <Suspense fallback={<div>Loading...</div>}>
            <div className=" grid grid-cols-8 gap-1">
              {[
                'First Name',
                'Last Name',
                'Email',
                'Phone',
                'Archived',
                'Role',
              ].map((title, id) => (
                <h2
                  key={id}
                  className={`${
                    title == 'Email' && 'col-span-2'
                  } py-4 font-sans font-normal tracking-widest text-left uppercase`}>
                  {title}
                </h2>
              ))}
            </div>
            <div className="flex flex-col justify-between mb-4">
              {plannerData?.map((planner: Planner, id: number) => (
                <PlannerRow planner={planner} key={id} />
              ))}
            </div>
          </Suspense>
        </div>
        <Link href="/planners/edit/new">
          <button
            type="button"
            className="bg-[rgba(219,96,53)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-normal text-white border border-transparent rounded-md shadow-sm">
            New Planner
          </button>
        </Link>{' '}
      </section>
    </div>
  );
}
