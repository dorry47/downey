import React from 'react';
import AllClientsRow from '../../../../components/AllClientsRow';
import events from '../../../data/events.json';
import Link from 'next/link';

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="text-3xl font-normal leading-tight tracking-wide text-gray-900">
            Projects
          </h1>
        </div>
      </header>
      <section className="max-w-7xl w-[1200px] sm:px-6 lg:px-8 mx-auto overflow-x-auto">
        <div className=" flex flex-col">
          <div className=" grid grid-cols-5 gap-1">
            {['PLANNER', 'COUPLE', 'URL', '	PROJECT ID'].map((title, id) => (
              <h2
                key={id}
                className={` py-4 font-sans font-normal tracking-widest text-left uppercase`}>
                {title}
              </h2>
            ))}
          </div>

          {events.map((planner) =>
            planner.events.map((event, id) => (
              <AllClientsRow
                key={id}
                planner={planner.planner}
                event={{
                  names: event.names.join(', '),
                  slug: event.slug,
                  projectID: event.projectId,
                }}
              />
            ))
          )}
        </div>
        <Link href="/clients/new">
          <button
            type="button"
            className="hover:bg-[rgba(219,96,53)] my-4 bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-normal text-white border border-transparent rounded-md shadow-sm">
            New Project
          </button>
        </Link>{' '}
      </section>
    </>
  );
};

export default Page;
