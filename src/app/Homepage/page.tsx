'use client';
import ClientBox from '../../../components/ClientBox';
import events from '../../data/events.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../../context/StateContext';

interface Event {
  names: string[];
  date: string;
  active: boolean;
  slug: string;
}

interface Planner {
  planner: string;
  events: Event[];
}

export default function Home() {
  const [activeList, setActiveList] = useState<{ [key: string]: boolean }>({});
  const { state, setState } = useStateContext();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') as string);
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (session) {
      setState({ ...state, session, user });
    }
  }, []);

  useEffect(() => {
    console.log(
      'current local storage',
      JSON.parse(localStorage.getItem('session') as string)
    );
    console.log(state);
  }, [state]);

  const toggleList = (planner: string) => {
    console.log(planner);

    setActiveList((prevActiveList) => ({
      ...prevActiveList,
      [planner]: !prevActiveList[planner],
    }));
  };

  return (
    <>
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
                  Hello !
                </h1>
              </div>
            </div>
          </div>
        </header>

        <section className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
          <div className="md:mt-10">
            <div className="md:grid-cols-3 md:mt-8 grid grid-cols-2 gap-4 mt-2 text-center">
              <div className="md:col-span-3 col-span-2">
                <p className="text-[rgba(217,142,72)] sm:text-2xl mt-2 font-serif text-2xl font-extrabold leading-8 tracking-widest uppercase">
                  Your Clients
                </p>
              </div>
              <div className="md:col-span-3 md:grid-cols-3 md:px-0 grid grid-cols-1 col-span-2 gap-4 px-3">
                {events
                  .filter((planner: Planner) => planner.planner === 'Kelsey')
                  .flatMap((planner: Planner) => planner.events)
                  .map((event: Event, id: number) => (
                    <ClientBox
                      key={id}
                      names={event.names}
                      date={event.date}
                      active={event.active}
                      slug={event.slug}
                    />
                  ))}
                <Link href="/clients/new">
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
              .filter((planner: Planner) => planner.planner !== 'Kelsey')
              .map((list: Planner, id: number) => (
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
                    list.events.map((event: Event, id: number) => (
                      <ClientBox
                        key={id}
                        names={event.names}
                        date={event.date}
                        active={event.active}
                        slug={event.slug}
                      />
                    ))}
                  {activeList[list.planner] && (
                    <Link href="/clients/new">
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
                  )}
                </div>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
