import React from 'react';
import { Progressbar } from './utils/Progressbar';

export const StepsContainer = ( { title, step, totalSteps, children}) => {
  return (
    <div className='w-full md:w-[700px] border-1 border-bgLightGreen mx-auto my-11 p-8 rounded-3xl'>
      {/* heading changes dynamically and the step count changes*/}
      <div className='w-full flex justify-between items-center h-fit' >
        <h2 className='font-[Jejumyeongjo] text-2xl md:text-[32px] w-full'>{title}</h2>
        <p className='flex'>Step<span className='ml-1'>{step}</span>/{totalSteps}</p>
      </div>

      {/* progress bar is supposed to be here on the design */}
      <Progressbar step={step} totalSteps={totalSteps}/>
      
      {/* Content (Dynamic Form Content) */}
      {children}
    </div>
  )
}
