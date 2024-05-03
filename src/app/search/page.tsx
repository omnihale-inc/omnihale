'use client';

import { useEffect, useState } from 'react';
import Search from '@/components/Search';
import SearchItem from '@/components/SearchItem';
import ScheduleModal from '@/components/ScheduleModal';
import ScheduleModalChildren from '@/components/ScheduleModalChildren';
import React from 'react';

type SearchItemProp = {
  profilePic: string;
  name: string;
  address: string;
  state: string;
  appointments: number;
  id: number;
  fields: Array<string>;
};

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000'
    : 'https://api.omnihale.com';

export default function SearchPage() {
  // State for search input value
  const [search, setSearch] = useState('');

  // State for search results
  const [data, setData] = useState<Array<SearchItemProp>>([]);

  // State to track if search has been triggered
  const [isSearch, setIsSearch] = useState(false);

  // State for modal visibility and name
  const [modal, setModal] = useState({
    modal: false,
    name: '',
  });

  useEffect(() => {
    // Check if the user is coming from the schedule page
    if (localStorage.getItem('schedule') === 'true') {
      console.log('ran');
      // Open the modal if the user is coming from the schedule page
      const modal = JSON.parse(localStorage.getItem('modal') || 'null') as {
        modal: boolean;
        name: string;
      };

      if (modal) setModal({ modal: modal.modal, name: modal.name });
      // Update the browser history to reflect the current page as 'schedule'
      history.pushState({}, '', '/schedule');
      // Reset the 'schedule' flag in local storage
      localStorage.setItem('schedule', 'false');
    }
  }, []);

  useEffect(() => {
    // Get the search value from local storage
    const search = localStorage.getItem('search');
    if (search) {
      // Set the search value and trigger search
      setSearch(search);
      setIsSearch(true);
    }

    // Check if the search value exists
    if (search) {
      // Call the searchRequest function with the current search value
      searchRequest(isSearch, search, setData);
    }
  }, [isSearch, search]);

  useEffect(() => {
    searchRequest(isSearch, search, setData);
  }, [isSearch, search]);

  return (
    isSearch && (
      <main className='w-10/12 max-w-7xl mx-auto'>
        <header className='pt-10'>
          <h3 className='text-center lg:text-left text-lg lg:text-4xl font-semibold'>
            Omnihale
          </h3>
          <div className='lg:w-6/12 mt-4 lg:mt-8 lg:ml-6'>
            <Search
              search={search}
              setSearch={setSearch}
              className='pl-4 pr-10 lg:px-6 py-2.5'
              searchRequest={setIsSearch}
            />
          </div>
        </header>
        <section>
          <p className='mt-4 lg:mt-8 lg:ml-6 text-xs lg:text-base'>
            Search results found!
          </p>
          <div className='md:flex md:flex-wrap md:justify-between'>
            {data &&
              data.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <SearchItem {...item} onModal={setModal} />
                    {modal.modal && modal.name === item.name && (
                      <ScheduleModal>
                        <ScheduleModalChildren
                          onModal={setModal}
                          fields={item.fields}
                          userId={item.id}
                        />
                      </ScheduleModal>
                    )}
                  </React.Fragment>
                );
              })}
          </div>
        </section>
      </main>
    )
  );
}
function searchRequest(
  isSearch: boolean,
  search: string,
  setData: React.Dispatch<React.SetStateAction<SearchItemProp[]>>
) {
  localStorage.removeItem('search_result');

  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  };

  // Perform fetch only when the isSearch is true to avoid
  // unnecessary network request
  if (isSearch) {
    // Fetch search results from the API
    fetch(`${URL}/search?q=${search}`, options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Update the data state with the search results
        setData(data);
      });
  }
}
