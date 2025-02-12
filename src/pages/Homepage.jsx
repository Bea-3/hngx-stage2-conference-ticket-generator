import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import SelectTicket from './components/SelectTicket';
import BookedTicket from './components/BookedTicket';
import AttendeeDetails from './components/AttendeeDetails';

const Homepage = () => {

  return (
    <div className='conatiner w-max-[1200px] min-h-full border-red-600 border-2'> 
       <Navbar/>
      
      <SelectTicket/>

    </div>
  )
}

export default Homepage