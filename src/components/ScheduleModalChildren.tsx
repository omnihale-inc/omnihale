'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import addIcon from '@/assets/icons/add.png';
import closeIcon from '@/assets/icons/close.png';
import { socket } from '@/socket';

type stringObject = { [index: string]: string };

const URL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000'
    : 'https://api.omnihale.com';

const ScheduleModalChildren = React.memo(function ScheduleModalChildren({
  onModal,
  fields,
  userId,
}: {
  onModal: (value: { modal: boolean; name: string }) => void;
  fields: Array<string>;
  userId: number;
}) {
  const [addAppointment, setAddAppointment] = useState<stringObject>({});
  const [success, setSuccess] = useState(false);

  const sendAppointmentHandler = (addAppointment: object) => {
    socket.emit('appointments', [addAppointment, userId]);
    setSuccess(true);
  };

  return (
    <div className='fixed w-screen h-screen backdrop-blur-sm grid place-items-center z-20'>
      <div className='w-10/12 max-w-2xl border border-gray-200 rounded-md bg-gray-50'>
        <div className='flex items-center justify-between border-b border-gray-100 p-4 mb-2'>
          <h3 className='font-semibold'>Schedule Appointment</h3>
          <button
            className='border rounded-2xl border-black px-4 py-1 text-sm flex items-center'
            onClick={() => {
              // Closes modal
              onModal({ modal: false, name: '' });
              // Changes url back to health care provider home
              history.pushState({}, '', '/search');
              // Set Schedule to false
              localStorage.setItem('schedule', 'false');
              // Enables scrolling
              const body = document.querySelector('body');
              body?.setAttribute('style', 'overflow:scroll-y');
              // reload page so user can seee appointment increment
              location.reload();
            }}
          >
            <Image src={closeIcon} alt='save fields' width={12} height={12} />
            <span className='text-sm ml-1'>Close</span>
          </button>
        </div>
        {success && <p className='text-md ml-4 my-2 text-green-600'>success</p>}
        <form
          className='p-4'
          onSubmit={
            // Prevents form from submitting
            (e) => e.preventDefault()
          }
        >
          {
            // Maps through fields and creates input fields
            fields.map((field, index) => (
              <input
                type='text'
                className='mb-2 w-full text-xs px-4 py-2 border rounded-md'
                key={index}
                name={field}
                value={addAppointment[field] || ''}
                placeholder={field}
                onChange={(e) => {
                  setSuccess(false);
                  // Adds appointment input fields to addAppointment state
                  const name = e.target.name;
                  const value = e.target.value;
                  setAddAppointment((state: stringObject) => ({
                    ...state,
                    [name]: value,
                  }));
                }}
              />
            ))
          }
          <div className='flex justify-end mt-2'>
            <button
              className='border rounded-2xl border-black px-4 py-1 text-sm flex items-center'
              onClick={() => {
                sendAppointmentHandler(addAppointment);
              }}
            >
              <Image src={addIcon} alt='save fields' width={13} height={13} />
              <span className='text-sm ml-1'>Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default ScheduleModalChildren;
