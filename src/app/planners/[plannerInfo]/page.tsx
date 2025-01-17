'use client';
import React, { useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useClient } from '../../../../lib/useClient';

type Props = {};

export default function Page(props: Props) {
  const [plannerData, setPlannerData] = React.useState<any>([]);
  const supabase = useClient();
  const pathName = usePathname();
  const plannerSlug = pathName.split('/planners/')[1];
  const formattedSlug = plannerSlug.replace(/-/g, ' ');

  const capitalizeSlug = (slug: string) => {
    return slug
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  const formattedAndCapitalizedSlug = capitalizeSlug(formattedSlug);

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

  useEffect(() => {
    fetchPlannerData().then((data: any) => {
      setPlannerData(data[0]);
    });
  }, []);

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            {plannerData?.name?.split(' ')[0]}{' '}
            {plannerData?.name?.split(' ')[1]}
          </h1>
        </div>
      </header>
      <section className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <p id="notice"></p>
        <p>
          <strong>First name:</strong> {plannerData?.name?.split(' ')[0]}
        </p>
        <p>
          <strong>Last name:</strong> {plannerData?.name?.split(' ')[1]}
        </p>
        <p>
          <strong>Email:</strong> {plannerData?.email}
        </p>
        <p>
          <strong>Phone:</strong> {plannerData?.phone}
        </p>
        <p>
          <strong>Archived:</strong> {plannerData?.archived ? 'true' : 'false'}
        </p>
        <div className=" flex gap-4 my-2">
          <Link href="/planners">
            <button className="bg-[rgba(219,96,53)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-normal text-white border border-transparent rounded-md shadow-sm">
              Back
            </button>
          </Link>{' '}
          <Link href={`/planners/edit/${plannerSlug}`}>
            <button className="bg-[rgba(219,96,53)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-normal text-white border border-transparent rounded-md shadow-sm">
              Edit
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
