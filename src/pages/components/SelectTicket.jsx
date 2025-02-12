import React from 'react';
import { StepsContainer } from './StepsContainer';
import { Button } from './utils/Button';

// passing props 
const SelectTicket = ( { nextStep, step, totalSteps }) => {
  return (
    <StepsContainer title="Ticket Selection" step={step} totalSteps={totalSteps}>
        <form>
        <p>YES</p>
        <div className='flex justify-between mt-4'>
          {/* on cancel, clear the form data */}
        <Button className='border-white border-2'>Cancel</Button>
        <Button className='border-white border-2' onClick={nextStep}>Next</Button>
        </div>
      </form>

    </StepsContainer>  
  )
}

export default SelectTicket