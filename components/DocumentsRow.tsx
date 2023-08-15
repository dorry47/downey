'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  document: {
    title: string;
    status: string;
    id: number;
  };
};

const DocumentsRow = (props: Props) => {
  const { title, status, id } = props.document;
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/deleteDocument`, {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
    });
    const data = await res.json();
    toast.success('Document deleted');
    window.location.reload();
  };
  return (
    <div className="grid grid-cols-4 gap-1">
      <p className=" py-4 font-serif text-base text-left">{title}</p>
      <p className="py-4 font-serif text-base text-left">{status}</p>
      <p className="py-4 font-serif text-base text-left">{id}</p>

      <div className="grid grid-cols-3 gap-1 my-auto">
        <p className="flex justify-center font-sans text-left">
          <Link href={`/documents/${id}`}>
            <button
              type="button"
              className="bg-[rgba(217,216,214)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-2 py-1 text-sm font-normal text-black border border-transparent rounded-md shadow-sm">
              View
            </button>
          </Link>{' '}
        </p>
        <p className="flex justify-center font-sans text-left">
          <Link href={`/documents/edit?edit=${id}`}>
            <button
              type="button"
              className="bg-[rgba(217,216,214)] hover:bg-[rgba(217,142,72)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 inline-flex items-center px-1 py-1 text-sm font-normal text-black border border-transparent rounded-md shadow-sm">
              Edit
            </button>
          </Link>{' '}
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default DocumentsRow;
