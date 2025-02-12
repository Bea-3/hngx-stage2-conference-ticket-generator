import React from 'react';
import { useState } from 'react';
import Navbar from './components/Navbar';
import SelectTicket from './components/SelectTicket';
import AttendeeDetails from './components/AttendeeDetails';
import BookedTicket from './components/BookedTicket';


const Homepage = () => {
  // useState to track the current step
  //onclick of the button of the form, conditionally display the next step or move back to the previous

  const [step, setStep] = useState(1);

  const nextStep = () => setStep( (prev) => prev + 1);
  const prevStep = () => setStep ( () => prev - 1);
  return (
    <div className='conatiner w-max-[1200px] min-h-full border-red-600 border-2'> 
       <Navbar/>
      
      {step === 1 && <SelectTicket nextStep = {nextStep} />}
      {step === 2 && <AttendeeDetails nextStep = {nextStep} prevStep = {prevStep} />}
      {step === 3 && <BookedTicket prevStep = {prevStep}/>}

    </div>
  )
}

export default Homepage