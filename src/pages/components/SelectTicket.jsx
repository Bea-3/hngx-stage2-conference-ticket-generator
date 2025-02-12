import React from 'react';
import { StepsContainer } from './StepsContainer';
import { Button } from './utils/Button';
import { TicketOptions } from './utils/TicketOptions';

// passing props 
const SelectTicket = ( { nextStep, step, totalSteps }) => {
  return (
    <StepsContainer title="Ticket Selection" step={step} totalSteps={totalSteps}>
        <form className='bg-formBg border-1 border-bgLightGreen rounded-3xl p-6 my-7'>
          {/* heading */}
          <div className='bg-formHeadingBg border-1 border-bgLightGreen rounded-3xl text-center mb-4 p-1'>
            <h2 className='font-[RoadRage] text-6xl my-2'>Techember Fest ”25</h2>
            <p className='font-[Roboto] my-2'>Join us for an unforgettable experience at <br/>[Event Name]! Secure your spot now.</p>
            <div className='font-[Roboto] flex justify-center items-center gap-3 my-3'>
              <div className='flex gap-2'>
               
                <p>[Event Location]</p>
              </div>
              ||
              <div className='flex gap-2'>
                <p>March 15, 2025</p> | <p>7:00 PM</p>
              </div>
            </div>
          </div>

          <hr className='bg-formHeadingBg w-full h-1 border-0 my-7'/>

          {/* select ticket */}
          <div>
            <p>Select Ticket Type:</p>

            {/* card group with 3 tickets */}
            <TicketOptions/>
          </div>
          {/* Select Number of Tickets */}
          <div className='my-8'>
          <p>Number of Tickets</p>
          <select name="" id="" value='' onChange=''
          className='w-full bg-inherit border-1 border-bgLightGreen p-3 rounded-xl mt-2'
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          </div>

        <div className='flex justify-center gap-8 mt-4 rounded-3xl border-1 border-bgLightGreen font-[Jejumyeongjo]'>
          {/* on cancel, clear the form data */}
        <Button className='border-2 border-bgRingGreen text-bgInputLightGreen md:w-[214px] w-full'>Cancel</Button>
        <Button className='border-2 border-bgRingGreen text-bgInputLightGreen hover:text-white hover:bg-bgInputLightGreen hover:border-0 md:w-[214px] w-full' onClick={nextStep}>Next</Button>
        </div>
      </form>

    </StepsContainer>  
  )
}

export default SelectTicket