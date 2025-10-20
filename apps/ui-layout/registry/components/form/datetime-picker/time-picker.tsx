'use client';

import { SmartDatetimeInput } from '@/components/ui/date-time-input';
import React, { useState } from 'react';

export default function Component() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    console.log('Selected date:', date);
  };

  return (
    <div className='p-4 max-w-md mx-auto py-10'>
      <SmartDatetimeInput
        value={selectedDate}
        showCalendar={false}
        showTimePicker={true}
        onValueChange={handleDateChange}
        placeholder='Enter a date and time'
        className='lg:w-96'
      />
      {/* {selectedDate && (
        <p className='mt-4'>Selected Date: {selectedDate.toLocaleString()}</p>
      )} */}
    </div>
  );
}
