import React from 'react';

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="fixed z-[1000] bg-white justify-center align-middle top-0 bottom-0 left-0 right-0  h-full w-full m-auto flex text-center text-2xl">
      <div className="m-auto">Loading...</div>
    </div>
  );
};

export default loading;
