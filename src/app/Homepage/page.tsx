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
  active: string;
  slug: string;
}

interface Planner {
  planner: string;
  events: Event[];
  plannerEmail: string;
}

interface LoggedInPlanner {
  name: string;
  email: string;
  phone: string;
  address: string;
  archived: boolean;
  role: string;
}

export default function Page() {
  const [activeList, setActiveList] = useState<{ [key: string]: boolean }>({});
  const { state, setState } = useStateContext();
  const [clientData, setClientData] = useState<any[]>();
  const [loggedInPlanner, setLoggedInPlanner] = useState<LoggedInPlanner>();
  const supabase = useClient();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  // const updatePassword = async () => {
  //   const { data: user, error } = await supabase.auth.admin.updateUserById(
  //     '25f4f821-04f7-4774-810b-9ba202fa52c3',
  //     { password: 'password', email_confirm: true }
  //   );
  //   if (error) console.log(error);
  //   else console.log(user);
  // };
  // updatePassword();

  const allClients = async () => {
    let { data, error } = await supabase
      .from('new_client')
      .select(
        'plannerName, plannerEmail, SLUG, PEOPLE->>P_A_FNAME, PEOPLE->>P_B_FNAME, EVENT_DETAILS->>WED_MONTH, EVENT_DETAILS->>WED_DAY, EVENT_DETAILS->>WED_YEAR, ADMIN_INFO->>ARCHIVED'
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
    }
  }, []);

  useEffect(() => {
    console.log('loggedInPlanner', loggedInPlanner);
    if (loggedInPlanner && loggedInPlanner.role == 'planner') {
      setIsLoading(false);
    } else if (loggedInPlanner && loggedInPlanner.role == 'client') {
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInPlanner));
      window.location.href = `/clients/new?edit=${loggedInPlanner?.name.replace(
        ' + ',
        '-'
      )}`;
    }
  }, [loggedInPlanner]);

  const allPlanners = async () => {
    let { data, error } = await supabase
      .from('users')
      .select('name, email, phone, address, archived, role')
      .in('role', ['planner', 'stylist']);

    if (error) {
      console.log(error);
    } else {
      // check data.archived is true, if so delete from data array
      data?.map((planner: any, id: number) => {
        if (planner.archived == true) {
          data?.splice(id, 1);
        }
      });
      return data;
    }
  };

  const groupClientsByPlanner = (
    clients: any[],
    validPlannerEmails: Set<string>
  ): Planner[] => {
    const groupedClients: { [plannerEmail: string]: Planner } = {};

    clients.forEach((client) => {
      const plannerEmail: string = client.plannerEmail;
      if (
        !groupedClients[plannerEmail] &&
        validPlannerEmails.has(plannerEmail)
      ) {
        groupedClients[plannerEmail] = {
          planner: client.plannerName.trim(), // Set the planner property correctly
          events: [],
          plannerEmail: plannerEmail,
        };
      }

      if (validPlannerEmails.has(plannerEmail)) {
        groupedClients[plannerEmail].events.push({
          names: [client.P_A_FNAME, client.P_B_FNAME],
          date: `${client.WED_MONTH} ${client.WED_DAY}, ${client.WED_YEAR}`,
          active: client.ARCHIVED,
          slug: client.SLUG,
        });
      }
    });

    return Object.values(groupedClients);
  };

  useEffect(() => {
    console.log('planner email', `${state?.user?.email}`);

    if (state.user !== null) {
      const loggedInUser = async () =>
        await supabase.from('users').select('*').eq('email', state.user.email);

      loggedInUser().then((data: any) => {
        console.log('logged in data', data);
        setLoggedInPlanner(data.data[0]);
      });
    }

    if (state.session !== null) {
      allPlanners().then((plannerData: any) => {
        console.log('planner data', plannerData);

        // Create a Set of valid planner emails (non-archived)
        const validPlannerEmails = new Set(
          plannerData
            .filter((planner: any) => !planner.archived)
            .map((planner: any) => planner.email)
        );

        allClients().then((data: any) => {
          console.log('pre organized', data);

          // Group clients by planner email and include only valid planners
          const groupedClients = groupClientsByPlanner(
            data,
            validPlannerEmails as Set<string>
          );

          console.log('post organized', groupedClients);

          setClientData(groupedClients as Planner[]);
        });
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

  if (isLoading) {
    return (
      <div className="fixed z-[1000] bg-white justify-center align-middle top-0 bottom-0 left-0 right-0  h-full w-full m-auto flex text-center text-2xl">
        <div className="m-auto">Loading...</div>
      </div>
    );
  }

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
                {clientData &&
                  clientData
                    .filter(
                      (planner: Planner) =>
                        planner.plannerEmail == loggedInPlanner?.email
                    )
                    .flatMap((planner: Planner) => planner.events)
                    .map((event: Event, id: number) => {
                      if (event.active == 'true') {
                        return null;
                      } else {
                        return (
                          <ClientBox
                            key={id}
                            names={event.names}
                            date={event.date}
                            active={event.active}
                            slug={event.slug}
                          />
                        );
                      }
                    })}

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
                    planner.plannerEmail !== loggedInPlanner?.email
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
                      list.events.map((event: Event, id: number) => {
                        if (event.active == 'true') {
                          return null;
                        } else {
                          return (
                            <ClientBox
                              key={id}
                              names={event.names}
                              date={event.date}
                              active={event.active}
                              slug={event.slug}
                            />
                          );
                        }
                      })}
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
