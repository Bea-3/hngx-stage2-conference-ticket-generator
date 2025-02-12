import React from 'react'

export const Button = ( {children, onClick, className = '', icon}) => {
  return (
    <button
      className={`rounded-lg flex justify-center items-center p-2 cursor-pointer border-r-none ${className}`}
      onClick={onClick}
    >
      {children}
      {/* conditionally render icons if the button has an icon */}
      {icon && <img src={icon} alt="icon"/>}
    </button>
  )
}
