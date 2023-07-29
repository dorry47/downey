'use client';
import React from 'react';

type Props = {
  planner: {
    name: string;
    email: string;
    phone: string;
    archived: boolean;
    slug: string;
  };
};

const PlannerRow = (props: Props) => {
  const { name, email, phone, archived } = props.planner;

  const firstName = name.split(' ')[0];
  const lastName = name.split(' ')[1];
  const slug = `${firstName}-${lastName}`;

  const handleDelete = async () => {
    const res = await fetch(`/api/deletePlanner`, {
      method: 'DELETE',
      body: JSON.stringify({ email: email }),
    });
    const data = await res.json();
    console.log('deleted', data);
  };
  return (
    <div className=" grid grid-cols-7 gap-1">
      <p className="py-4 font-serif text-base text-left capitalize">
        {firstName}
      </p>
      <p className="py-4 font-serif text-base text-left capitalize">
        {lastName}
      </p>
      <p className="col-span-2 py-4 font-serif text-base text-left">{email}</p>
      <p className="py-4 font-serif text-base text-left">{phone}</p>
      <p className="py-4 font-serif text-base text-left">
        {archived?.toString()}
      </p>
      <div className="grid grid-cols-3 gap-1 my-auto">
        <p className="flex justify-center font-sans text-left">
          <a href={`planners/${slug}`}>
            <button
              type="button"
              className="bg-[rgba(217,216,214)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-2 py-1 text-sm font-normal text-black border border-transparent rounded-md shadow-sm">
              View
            </button>
          </a>{' '}
        </p>
        <p className="flex justify-center font-sans text-left">
          <a href={`planners/edit/${slug}`}>
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

export default PlannerRow;
