'use client';
import Link from 'next/link';
import React from 'react';
import DocumentsRow from '../../../components/DocumentsRow';
import { useQuery } from '@tanstack/react-query';
import { useClient } from '../../../lib/useClient';

type Props = {};

interface Document {
  id: number;
  title: string;
  status: string;
}

const Page = (props: Props) => {
  const supabase = useClient();

  const fetchDocuments = async () => {
    let { data, error } = await supabase.from('documents').select('*');
    if (error) {
      console.log(error);
    } else {
      return data;
    }
  };

  const { data: documentsData } = useQuery({
    queryKey: ['documents'],
    queryFn: fetchDocuments,
  });

  console.log(documentsData);

  // useEffect(() => {
  //   const session = JSON.parse(localStorage.getItem('session') as string);
  //   const user = JSON.parse(localStorage.getItem('user') as string);
  //   if (session) {
  //     setState({ ...state, session, user });
  //   }
  // }, []);

  return (
    <div className="">
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            Documents
          </h1>
        </div>
      </header>
      <section className="max-w-7xl justify-center px-6 py-8 mx-auto overflow-auto break-words">
        <div className="w-[1000px] mx-auto flex flex-col">
          <div className=" grid grid-cols-4 gap-1">
            {['TITLE', 'STATUS', 'ID'].map((title, id) => (
              <h2
                key={id}
                className={`py-4 font-sans font-normal tracking-widest text-left uppercase`}>
                {title}
              </h2>
            ))}
          </div>
          <div className="flex flex-col justify-between mb-4">
            {documentsData?.map((document: Document, id: number) => (
              <DocumentsRow key={id} document={document} />
            ))}
            <div className="flex justify-end w-full my-10">
              <button
                type="button"
                className="bg-[rgba(219,96,53)]  hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-normal text-white border border-transparent rounded-md shadow-sm">
                <Link href={`/documents/edit`}>New Document</Link>{' '}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
