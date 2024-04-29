'use client';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import DocumentsRow from '../../../components/DocumentsRow';

type Props = {};

interface Document {
  id: number;
  title: string;
  status: string;
}

const Page = (props: Props) => {
  const [documentData, setDocumentData] = useState<Document[] | null>(null);

  const fetchDocuments = async () => {
    try {
      const data = await fetch('/api/fetchDocuments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      const json = await data.json();
      setDocumentData(json.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="">
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            Documents
          </h1>
        </div>
      </header>
      <section className="max-w-7xl px-6 py-8 mx-auto overflow-auto break-words">
        <div className="w-[1200px] flex flex-col">
          <div className=" grid grid-cols-8 gap-1">
            {['Title', 'Status', 'ID'].map((title, id) => (
              <h2
                key={id}
                className={`${
                  title == 'Email' && 'col-span-2'
                } py-4 font-sans font-normal tracking-widest text-left uppercase`}>
                {title}
              </h2>
            ))}
          </div>

          <div className="flex flex-col justify-between mb-4">
            {documentData &&
              (documentData as Document[]).map(
                (document: Document, id: number) => (
                  <DocumentsRow document={document} key={id} />
                )
              )}
          </div>
        </div>
        <Link href="/documents/edit/new">
          <button
            type="button"
            className="bg-[rgba(219,96,53)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-4 py-2 text-sm font-normal text-white border border-transparent rounded-md shadow-sm">
            + New Document
          </button>
        </Link>
      </section>
    </div>
  );
};

export default Page;
