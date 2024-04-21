import React from 'react';
import Image from 'next/image';

type SearchItemProp = {
  profilePic?: string;
  name: string;
  address: string;
  state: string;
  appointments: number;
  fields: Array<string>;
};
const SearchItem = ({
  profilePic,
  name,
  address,
  appointments,
  state,
  fields,
}: SearchItemProp) => {
  return (
    <ul className='flex flex-col lg:flex-row items-center lg:items-center mt-8 lg:mt-12 lg:ml-6 lg:space-x-4 lg:space-y-0 space-y-4 border w-10/12  md:w-5/12 lg:3/6 mx-auto md:mx-0 p-4 roun'>
      <ul className='mx-4 mb-2'>
        <li className='relative w-24 h-24 lg:w-32 lg:h-32'>
          {profilePic ? (
            <Image
              src={profilePic}
              fill
              alt='healthcare'
              className='object-cover rounded-full'
            />
          ) : (
            <div className='bg-gray-200 rounded-full w-full h-full flex items-center justify-center'>
              <div className='flex items-center'>
                {name.split(' ').map((item, index) => (
                  <span key={index} className='text-4xl'>
                    {item[0].toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </li>
      </ul>
      <ul className='w-11/12'>
        <li className='text-sm lg:text-md mb-2'>{name}</li>
        <li className='text-xs mb-2'>{address}</li>
        <li className='text-xs mb-2'>{state}</li>
        <li className='text-xs mb-2'>
          Number of Appointments today: {appointments}
        </li>
        <button className='block border px-5 py-2 rounded-full text-sm mt-8 w-fit mx-auto lg:mx-0'>
          Schedule appointment
        </button>
      </ul>
    </ul>
  );
};

export default SearchItem;