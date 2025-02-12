import React from 'react';
import { Button } from './Button';

const AttendeeDetails = ({nextStep, prevStep}) => {
  return (
    <div>AttendeeDetails

    <div>
              
            <Button className='border-white border-2' onClick={prevStep}>Back</Button>
            <Button className='border-white border-2' onClick={nextStep}>Get My Free Ticket</Button>
            </div>
    </div>
  )
}

export default AttendeeDetails