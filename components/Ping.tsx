import React from "react";

const Ping = () => {
  return (
    <div className='relative'>
      <div className='absolute -left-4 top-1'>
        <div className='flex size-[11px]'>
          <div className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75' />
          <div className='absolute inline-flex h-full w-full rounded-full bg-primary' />
        </div>
      </div>
    </div>
  );
};

export default Ping;
