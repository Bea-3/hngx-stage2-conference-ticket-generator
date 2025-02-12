import React from 'react';
import { Progressbar } from './Progressbar';

const SelectTicket = () => {
  return (
    <div className='w-[700px] border-2 border-pink-200 mx-auto my-11 p-8'>
      {/* heading */}
      <div className='w-full border-2 border-white flex justify-between items-center h-fit' >
        <h2 className='font-[Jejumyeongjo] text-[32px]'>Ticket Selection</h2>
        <p className='flex'>Step<span className='ml-1'>1</span>/3</p>
      </div>
    </div>
  )
}

export default SelectTicket