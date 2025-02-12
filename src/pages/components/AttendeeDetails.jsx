import React from 'react';
import { StepsContainer } from './StepsContainer';
import { Button } from './utils/Button';

const AttendeeDetails = ({nextStep, prevStep, step, totalSteps}) => {
  return (
    <StepsContainer title="Attendee Details" step={step} totalSteps={totalSteps}>
      <form>
      <div className='flex justify-between mt-4'>
        <Button className='border-white border-2' onClick={prevStep}>
          Back
        </Button>
        <Button className='border-white border-2' onClick={nextStep}>
          Get My Free Ticket
        </Button>
      </div>
      </form>
    </StepsContainer>
  )
}

export default AttendeeDetails