'use client';
import React from 'react';

type Props = {
  planner: string;
  event: {
    names: string;
    slug: string;
    projectID: number;
  };
};

const AllClientsRow = (props: Props) => {
  const { names, slug, projectID } = props.event;
  const { planner } = props;

  const handleDelete = async () => {
    // const res = await fetch(`/api/plannerDelete/${slug}`, {
    //   method: 'DELETE',
    // });
    // const data = await res.json();
    console.log('deleted', slug);
  };
  return (
    <div className=" grid grid-cols-5 gap-1">
      <p className="py-4 font-serif text-base text-left">{planner}</p>
      <p className="py-4 font-serif text-base text-left">{names}</p>
      <p className="py-4 font-serif text-base text-left">{slug}</p>
      <p className=" py-4 overflow-auto font-serif text-base text-left">
        {projectID.toString().slice(0, 8)}
      </p>

      <div className="grid grid-cols-3 gap-1 my-auto">
        <p className="flex justify-center font-sans text-left">
          <a href={`/clients/${slug}`}>
            <button
              type="button"
              className="bg-[rgba(217,216,214)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-2 py-1 text-sm font-normal text-black border border-transparent rounded-md shadow-sm">
              View
            </button>
          </a>{' '}
        </p>
        <p className="flex justify-center font-sans text-left">
          <a href={`/clients/new?edit=${slug}`}>
            <button
              type="button"
              className="bg-[rgba(217,216,214)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-1 py-1 text-sm font-normal text-black border border-transparent rounded-md shadow-sm">
              Edit
            </button>
          </a>{' '}
        </p>
        <p className="flex justify-center font-sans text-left">
          <button
            onClick={() => handleDelete()}
            type="button"
            className="bg-[rgba(217,216,214)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-1 py-1 text-sm font-normal text-black border border-transparent rounded-md shadow-sm">
            Delete
          </button>
        </p>
      </div>
    </div>
  );
};

export default AllClientsRow;
