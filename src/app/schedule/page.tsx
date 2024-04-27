'use client';

import { permanentRedirect } from 'next/navigation';
import { useEffect } from 'react';

export default function SchedulePage() {
  // This page is only used to set a localStorage item and redirect
  // to the home page

  useEffect(() => {
    console.log('ran');
    localStorage.setItem('schedule', 'true');
    permanentRedirect('/search');
  }, []);
  // Set the localStorage item
  return '';
}
