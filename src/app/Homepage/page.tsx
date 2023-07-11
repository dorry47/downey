'use client';
import ClientBox from '../../../components/ClientBox';
import events from '../../data/events.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [activeList, setActiveList] = useState<{ [key: string]: boolean }>({});

  const toggleList = (planner: string) => {
    console.log(planner);

    setActiveList((prevActiveList) => ({
      ...prevActiveList,
      [planner]: !prevActiveList[planner],
    }));
  };

  useEffect(() => {
    console.log(activeList);
  }, [activeList]);

  return (
    <main className="">
      <header
        style={{
          backgroundImage: 'url(/images/header-background.jpg)',
        }}
        className="md:mb-10 bg-center bg-cover">
        <div className="lg:px-8 max-w-6xl p-4 px-6 mx-auto text-white">
          <div className="md:items-center md:pb-12 md:pt-12 text-center">
            <div className="md:col-span-10 md:py-12 md:mx-8 border-[rgba(238,217,212)] bg-[rgba(238,217,212)] bg-opacity-10 col-span-12 py-8 border border-solid">
              <h1 className="font-display md:text-3xl mt-2 text-xl font-normal leading-tight tracking-widest uppercase">
                Hello Kelsey!
              </h1>
            </div>
          </div>
        </div>
      </header>

      <section className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <div className="md:mt-10">
          <div
            className="md:grid-cols-3 md:mt-8 grid grid-cols-2 gap-4 mt-2 text-center"
            data-controller="project"
            data-project-list-hidden-className="hidden">
            <div className="md:col-span-3 col-span-2">
              <p className="text-[rgba(217,142,72)] sm:text-2xl mt-2 font-serif text-2xl font-extrabold leading-8 tracking-widest uppercase">
                Your Clients
              </p>
            </div>
            <div
              data-project-target="projectList"
              className="md:col-span-3 md:grid-cols-3 md:px-0 grid grid-cols-1 col-span-2 gap-4 px-3">
              {events
                .filter((planner: any) => planner.planner === 'Kelsey')
                .flatMap((planner: any) => planner.events)
                .map((event: any, id) => (
                  <ClientBox
                    key={id}
                    names={event.names}
                    date={event.date}
                    active={event.active}
                    slug={event.slug}
                  />
                ))}
              <Link href="/projects/new">
                <div className="md:col-span-1 bg-[rgba(219,96,53)] md:py-6 py-3">
                  <div className="md:mx-6 border-[rgba(219,96,53)] text-[rgba(238,217,212)] mx-3 border">
                    <h3 className="font-display md:text-xl md:mt-6 mt-3 text-base font-normal leading-tight tracking-widest uppercase">
                      New Client
                    </h3>
                    <h4 className="font-display md:text-sm lining-nums md:pb-6 pt-1 pb-3 text-xs font-normal leading-tight tracking-widest uppercase">
                      +
                    </h4>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {events
            .filter((planner: any) => planner.planner != 'Kelsey')
            .map((list: any, id) => (
              <div
                key={id}
                className="md:grid-cols-3 md:mt-8 grid grid-cols-2 gap-4 mt-2 text-center">
                <div className="md:col-span-3 col-span-2">
                  <p className="text-[rgba(217,142,72)] sm:text-2xl mt-2 font-serif text-2xl font-extrabold leading-8 tracking-widest uppercase">
                    {list.planner}
                  </p>
                  <h2
                    className="text-[rgba(238,217,212)] text-sm font-semibold tracking-wide uppercase"
                    onClick={() => toggleList(list.planner)}>
                    {activeList[list.planner] ? 'Hide List' : 'View List'}
                  </h2>
                </div>
                {activeList[list.planner] &&
                  list.events.map((event: any, id: number) => (
                    <ClientBox
                      key={id}
                      names={event.names}
                      date={event.date}
                      active={event.active}
                      slug={event.slug}
                    />
                  ))}
              </div>
            ))}
        </div>
      </section>
    </main>
  );
}
