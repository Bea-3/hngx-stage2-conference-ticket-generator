import React from 'react'
import { StepsContainer } from './StepsContainer';
import { Button } from './utils/Button';

const BookedTicket = ( {resetForm, step, totalSteps}) => {
  return (
    <StepsContainer title="Ready" step={step} totalSteps={totalSteps}>
          <form>
          <div className='flex justify-between mt-4'>
            <Button className='border-white border-2' onClick={resetForm}>Book Another Ticket
            </Button>
            <Button className='border-white border-2'>
            Download Ticket
            </Button>
          </div>
          </form>
        </StepsContainer>
  )
}

export default BookedTicket