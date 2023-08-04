'use client';
import React, { use, useEffect, useState } from 'react';
import AllClientsRow from '../../../../components/AllClientsRow';
import Link from 'next/link';
import { useClient } from '../../../../lib/useClient';
import { useStateContext } from '../../../../context/StateContext';

type Props = {};

interface ClientData {
  id: number;
  PEOPLE: {
    P_A_FNAME: string;
    P_B_FNAME: string;
  };
  plannerName: string;
  SLUG: string;
}

const Page = (props: Props) => {
  const [clientData, setClientData] = useState<ClientData[]>([]);
  const supabase = useClient();
  const { state, setState } = useStateContext();
  const [deletedItem, setDeletedItem] = useState<any>(false);

  const fetchClientData = async () => {
    let { data, error } = await supabase.from('new_client').select('*');
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') as string);
    const user = JSON.parse(localStorage.getItem('user') as string);
    fetchClientData().then((data: any) => {
      console.log(data);
      setClientData(data);
    });

    if (session) {
      setState({ ...state, session, user });
    }
  }, []);

  useEffect(() => {
    fetchClientData()
      .then((data: any) => {
        console.log(data);
        setClientData(data);
      })
      .then(() => {
        setDeletedItem(false);
      });
  }, [deletedItem]);

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="text-3xl font-normal leading-tight tracking-wide text-gray-900">
            All Clients
          </h1>
        </div>
      </header>
      <section className="max-w-7xl sm:px-6 lg:px-8 mx-auto overflow-auto overflow-x-auto">
        <div className="w-[1200px] flex flex-col">
          <div className=" grid grid-cols-5 gap-1">
            {['PLANNER', 'COUPLE', 'URL', '	PROJECT ID'].map((title, id) => (
              <h2
                key={id}
                className={` py-4 font-sans font-normal tracking-widest text-left uppercase`}>
                {title}
              </h2>
            ))}
          </div>

          {clientData &&
            clientData.map((client: ClientData, id: number) => {
              const names = `${client.PEOPLE.P_A_FNAME} + ${client.PEOPLE.P_B_FNAME}`;

              return (
                <AllClientsRow
                  key={id}
                  planner={client.plannerName}
                  setDeletedItem={setDeletedItem}
                  event={{
                    names: names,
                    slug: client.SLUG,
                    projectID: client.id,
                  }}
                />
              );
            })}
        </div>
        <Link href="/clients/new">
          <button
            type="button"
            className="hover:bg-[rgba(219,96,53)] my-4 bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-normal text-white border border-transparent rounded-md shadow-sm">
            New Client
          </button>
        </Link>{' '}
      </section>
    </>
  );
};

export default Page;
