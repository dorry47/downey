'use client';
import ClientBox from '../../../components/ClientBox';
import events from '../../data/events.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../../context/StateContext';
import React from 'react';
import { useClient } from '../../../lib/useClient';

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

export default function Page() {
  const [activeList, setActiveList] = useState<{ [key: string]: boolean }>({});
  const { state, setState } = useStateContext();
  const [clientData, setClientData] = useState<any[]>();

  const supabase = useClient();

  const allClients = async () => {
    let { data, error } = await supabase
      .from('new_client')
      .select(
        'plannerName, SLUG, PEOPLE->>P_A_FNAME, PEOPLE->>P_B_FNAME, EVENT_DETAILS->>WED_MONTH, EVENT_DETAILS->>WED_DAY, EVENT_DETAILS->>WED_YEAR, ADMIN_INFO->>ARCHIVED'
      );
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') as string);
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (session) {
      setState({ ...state, session, user });
    }
    allClients().then((data: any) => {
      console.log('pre organized', data);

      // i want you to seperate the data by planners sort of like planner1: [client1, client2, client3] planner2: [client1, client2, client3] but ensure that the client is only listed once
      data = data?.map((client: any) => {
        console.log(client);

        return {
          planner: client.plannerName.trim(),
          events: [
            {
              names: [client.P_A_FNAME, client.P_B_FNAME],
              date: `${client.WED_MONTH} ${client.WED_DAY}, ${client.WED_YEAR}`,
              active: client.ARCHIVED,
              slug: client.SLUG,
            },
          ],
        };
      });

      console.log('post organized', data);

      setClientData(data as any[]);
    });
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
    <div>
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
                  Hello {state.user?.user_metadata.name}!
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
                {/* for every planner inside clientData i want you to list the events */}
                {clientData &&
                  clientData
                    .filter(
                      (planner: Planner) =>
                        planner.planner == state.user.user_metadata.name
                    )
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

            {clientData &&
              clientData
                .filter(
                  (planner: Planner) =>
                    planner.planner !== state.user.user_metadata.name
                )
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
    </div>
  );
}
