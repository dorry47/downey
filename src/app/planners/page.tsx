import React from 'react';
import planners from '../../data/planners.json';
import PlannerRow from '../../../components/PlannerRow';
import Link from 'next/link';

type Props = {};

export default function Page(props: Props) {
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            Planners
          </h1>
        </div>
      </header>
      <section className="max-w-7xl w-[1200px] mx-auto overflow-x-scroll break-words">
        <div className="flex flex-col">
          <div className=" grid grid-cols-7 gap-1">
            {['First Name', 'Last Name', 'Email', 'Phone', 'Archived'].map(
              (title) => (
                <h2
                  className={`${
                    title == 'Email' && 'col-span-2'
                  } py-4 font-sans font-normal tracking-widest text-left uppercase`}>
                  {title}
                </h2>
              )
            )}
          </div>

          <div className="flex flex-col justify-between">
            {planners.map((planner) => (
              <PlannerRow planner={planner} />
            ))}
          </div>
        </div>
        <Link href="/planners/edit/new">
          <button
            type="button"
            className="bg-[rgba(219,96,53)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-normal text-white border border-transparent rounded-md shadow-sm">
            New Planner
          </button>
        </Link>{' '}
      </section>
    </>
  );
}
