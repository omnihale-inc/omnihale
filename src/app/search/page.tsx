'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Search from '@/components/Search';
import SearchItem from '@/components/SearchItem';

// const data = [
//   {
//     profilePic: '/logo.svg',
//     name: 'national eye center',
//     address: 'no 3 redemption road',
//     state: 'Abuja',
//     numberOfAppointments: 25,
//     fields: ['name', 'address', 'phone number', 'date of birth'],
//   },
//   {
//     profilePic: '/logo.svg',
//     name: 'national ear center',
//     address: 'ne appa 34 mando',
//     state: 'Kaduna',
//     numberOfAppointments: 10,
//     fields: ['name', 'address', 'phone number', 'date of birth'],
//   },
// ];

type SearchItemProp = {
  profilePic: string;
  name: string;
  address: string;
  state: string;
  appointments: number;
  fields: Array<string>;
};

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000'
    : 'https://api.omnihale.com';

export default function SearchPage() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState<Array<SearchItemProp>>([]);
  const [isDocumentReady, setIsDocumentReady] = useState(false);
  useEffect(() => {
    const search = localStorage.getItem('search');
    if (search) setSearch(search);
    const results = JSON.parse(localStorage.getItem('search_result') || '[]');
    if (results) setData(results);
    if (document.readyState === 'complete') setIsDocumentReady(true);
  }, []);

  const searchRequest = (value: string) => {
    const options = {
      method: 'POST',
      body: JSON.stringify({ search: value }),
      headers: {
        'content-type': 'application/json',
      },
    };

    fetch(`${URL}/search`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('search_result', JSON.stringify(data));
      });
  };
  return (
    isDocumentReady && (
      <main className='w-10/12 max-w-7xl mx-auto'>
        <header>
          <h3 className='text-center lg:text-left text-lg lg:text-4xl mt-10 font-semibold'>
            Omnihale
          </h3>
          <div className='lg:w-6/12 mt-4 lg:mt-8 lg:ml-6'>
            <Search
              search={search}
              setSearch={setSearch}
              className='pl-4 pr-10 lg:px-6 py-2.5'
              searchRequest={searchRequest}
            />
          </div>
        </header>
        <section>
          <p className='mt-4 lg:mt-8 lg:ml-6 text-xs lg:text-base'>
            Search results found!
          </p>
          <div className='md:flex md:flex-wrap md:justify-between'>
            {data.map((item, index) => {
              return <SearchItem key={index} {...item} />;
            })}
          </div>
        </section>
      </main>
    )
  );
}