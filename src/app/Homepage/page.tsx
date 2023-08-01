'use client';
import ClientBox from '../../../components/ClientBox';
import events from '../../data/events.json';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useStateContext } from '../../../context/StateContext';
import React from 'react';
import { useClient } from '../../../lib/useClient';
import { useRouter } from 'next/navigation';
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

interface LoggedInPlanner {
  name: string;
}

export default function Page() {
  const [activeList, setActiveList] = useState<{ [key: string]: boolean }>({});
  const { state, setState } = useStateContext();
  const [clientData, setClientData] = useState<any[]>();
  const [loggedInPlanner, setLoggedInPlanner] = useState<LoggedInPlanner>();
  const supabase = useClient();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const allClients = async () => {
    let { data, error } = await supabase
      .from('new_client')
      .select(
        'plannerName, SLUG, PEOPLE->>P_A_FNAME, PEOPLE->>P_B_FNAME, EVENT_DETAILS->>WED_MONTH, EVENT_DETAILS->>WED_DAY, EVENT_DETAILS->>WED_YEAR, ADMIN_INFO->>ARCHIVED'
      );
    if (error) {
      console.log(error);
    } else {
      console.log('clientData', data);
      return data;
    }
  };

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') as string);
    const user = JSON.parse(localStorage.getItem('user') as string);

    console.log('saved session', session);
    if (session) {
      setState({ ...state, session, user });
      setIsLoading(false);
    }
  }, []);

  // router.refresh();

  useEffect(() => {
    console.log('planner email', `${state?.user?.email}`);

    if (state.user !== null) {
      const loggedInUser = async () =>
        await supabase
          .from('users')
          .select('*')
          .eq('role', 'planner')
          .eq('email', state.user.email);

      loggedInUser().then((data: any) => {
        console.log('logfed in data', data.data[0]);
        setLoggedInPlanner(data.data[0]);
      });
    }

    if (state.session !== null) {
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
    }
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
      {isLoading ? (
        <div
          role="status"
          className="w-fit flex justify-center h-screen m-auto text-center align-middle">
          <svg
            aria-hidden="true"
            className="animate-spin fill-[#eed9d4] m-auto sm:w-[100px] sm:h-[100px] inline w-4 h-4 mr-2 text-white"
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
      ) : (
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
                    Hello {loggedInPlanner?.name.split(' ')[0]}!
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
                          planner.planner == loggedInPlanner?.name
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
                      planner.planner !== loggedInPlanner?.name
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
      )}
    </div>
  );
}
