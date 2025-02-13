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
  const totalSteps = 3;

  const nextStep = () => setStep( (prev) => prev + 1);
  const prevStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));
  const resetForm = () => {
    localStorage.clear();
    setStep(1); // Reset to Step 1
  };
  return (
    <div className='container w-full w-max-[1200px] min-h-full m-auto p-2'> 
       <Navbar/>
      {step === 1 && <SelectTicket nextStep = {nextStep} step={step} totalSteps={totalSteps}/>}
      {step === 2 && <AttendeeDetails nextStep = {nextStep} prevStep = {prevStep} step={step} totalSteps={totalSteps}/>}
      {step === 3 && <BookedTicket prevStep = {prevStep} resetForm={resetForm} step={step} totalSteps={totalSteps}/>}

    </div>
  )
}

export default Homepage