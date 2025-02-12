import React from 'react'
import { Button } from './Button';

const BookedTicket = ( {prevStep}) => {
  return (
    <div>BookedTicket

      <div>
                    
                    {/* return to select ticket on click */}
        <Button className='border-white border-2' onClick={() => prevStep(1)}>Book Another Ticket</Button>
        <Button className='border-white border-2'>Download Ticket</Button>
        </div>
    </div>
  )
}

export default BookedTicket