import React from 'react';
import logo from '../../assets/ticz-logo.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';
import { Button } from './utils/Button';

const Navbar = () => {
  const handleButtonClick = () => {
    alert('Button clicked!');
  };
  return (
    <div className='w-full max-w-[1200px] mt-5 p-2 border-1 border-bgRingGreen m-auto rounded-2xl'>
      <nav className='font-jeju w-full flex  justify-between items-center'>
        {/* logo */}
        <img src={logo} alt="Ticz logo" />

        {/* Nav Links */}
        <div className='nav-links w-[341px] justify-center gap-7 text-lg text-[#B3B3B3] hidden md:flex'>
          <a href="#" className='text-white'>Events</a>
          <a href="#">My Tickets</a>
          <a href="#">About Project</a>
        </div>

        {/*  button */}
        <div className='relative'>
        <Button className="w-[169px] bg-white flex justify-center content-center gap-2 text-textDark" onClick={handleButtonClick}
        icon={rightArrow} 
        >MY TICKETS</Button>
        </div>
      
      </nav>
    </div>
  )
}

export default Navbar