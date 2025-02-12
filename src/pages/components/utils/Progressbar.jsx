import React from 'react';

export const Progressbar = ({step, totalSteps}) => {

  const progress = (step / totalSteps) * 100;

  return (
    <div className='w-full bg-bgLightGreen rounded-full h-1 mt-1'>
      <div
        className="bg-btnGreen h-1 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
      
    </div>
  )
}