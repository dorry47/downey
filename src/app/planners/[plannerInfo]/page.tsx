'use client';
import React from 'react';
import planners from '../../../data/planners.json';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = {};

const page = (props: Props) => {
  const router = usePathname();
  const plannerSlug = router.split('/planners/')[1];

  const planner = planners.find((p) => p.slug === plannerSlug);

  return (
    <>
      <header className="bg-white shadow">
        <div className="max-w-7xl sm:px-6 lg:px-8 px-4 py-6 mx-auto">
          <h1 className="font-display pt-4 pb-2 text-3xl font-normal leading-tight tracking-widest text-center uppercase">
            {planner?.firstName} {planner?.lastName}
          </h1>
        </div>
      </header>
      <section className="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <p id="notice"></p>
        <p>
          <strong>First name:</strong> {planner?.firstName}
        </p>
        <p>
          <strong>Last name:</strong> {planner?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {planner?.email}
        </p>
        <p>
          <strong>Phone:</strong> {planner?.phone}
        </p>
        <p>
          <strong>Archived:</strong> {planner?.archived ? 'true' : 'false'}
        </p>
        <Link href={`/planners/edit/${plannerSlug}`}>Edit</Link> |{' '}
        <Link href="/planners">Back</Link>
      </section>
    </>
  );
};

export default page;
