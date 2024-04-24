'use client';

import Image from 'next/image';
import { useState } from 'react';
import Search from '@/components/Search';
import axios from 'axios';

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000'
    : 'https://api.omnihale.com';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const searchRequest = (value: string) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ search: value }),
      headers: {
        'content-type': 'application/json',
      },
    };

    axios(`${URL}/search`, options)
      .then((res) => {
        localStorage.setItem('search_result', JSON.stringify(res.data));
      })
      .catch((error) => {
        console.error('Axios error:', error.message);
      });
  };
  return (
    <main className='grid place-items-center h-screen'>
      <div className='flex flex-col justify-between w-10/12 max-w-xl'>
        <div>
          <h2 className='text-center text-lg lg:text-4xl mb-4 font-semibold'>
            Welcome
          </h2>
        </div>
        <Search
          search={search}
          setSearch={setSearch}
          className='pl-5 pr-12 lg:pl-5 lg:pr-7 py-3 lg:py-4'
          searchRequest={searchRequest}
        />
        <div className='flex flex-col items-center mt-12'>
          <a
            className='mt-16 font-semibold border w-fit py-2 px-7 m-auto mb-6 rounded-full'
            href='https://business.omnihale.com'
            target='_'
          >
            For Business
          </a>
          <div className='flex justify-center items-center'>
            <Image
              src='/logo.svg'
              alt='logo'
              width={30}
              height={30}
              className='rounded-md'
            />
            <h3 className='ml-1 lg:text-lg'>Omnihale</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
