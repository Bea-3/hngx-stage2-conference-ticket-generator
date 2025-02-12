import React from 'react';
import { Progressbar } from './Progressbar';
import { Button } from './Button';

// passing props 
const SelectTicket = ( {nextStep}) => {
  return (
    <div className='w-[700px] border-2 border-pink-200 mx-auto my-11 p-8'>
      {/* heading */}
      <div className='w-full border-2 border-white flex justify-between items-center h-fit' >
        <h2 className='font-[Jejumyeongjo] text-[32px]'>Ticket Selection</h2>
        <p className='flex'>Step<span className='ml-1'>1</span>/3</p>
      </div>
      <form>
        <p>YES</p>
        <div>
          {/* on cancel, clear the form data */}
        <Button className='border-white border-2'>Cancel</Button>
        <Button className='border-white border-2' onClick={nextStep}>Next</Button>
        </div>
      </form>
    </div>
  )
}

export default SelectTicket