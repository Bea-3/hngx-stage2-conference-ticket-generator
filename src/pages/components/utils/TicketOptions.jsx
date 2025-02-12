import React, { useState } from 'react'


const ticketType = [
  { type: 'REGULAR', price: 'Free', ticketsLeft: 20 },
  { type: 'VIP', price: '$50', ticketsLeft: 20 },
  { type: 'VVIP', price: '$150', ticketsLeft: 20 },
]

export const TicketOptions = ({ setSelectedTicket} ) => {
  const [selected, setSelected] = useState(null);
  
  const handleSelect = (ticket) => {
    setSelected(ticket.type);
    setSelectedTicket(ticket);
  };

  return (
    <div className='border-1 border-bgLightGreen p-4 rounded-3xl flex flex-wrap gap-6 mt-2'>
      {/* 3 cards with the ticket types */}
      { ticketType.map( (ticket) => (
        <button 
        key={ticket.type}
        onClick={() => handleSelect(ticket)}
        className={`border-1 border-bgLightGreen flex p-2 w-[242px] gap-2  ${ selected === ticket.type ? 'bg-bgRingGreen' : 'bg-inherit'} rounded-2xl justify-between items-start active:bg-bgRingGreen`}>
        <div className='flex flex-col gap-2 text-start'>
          <h3>{ticket.type} <span>ACCESS</span></h3>
          <p><span>{ticket.ticketsLeft}</span> left!</p>
        </div>
        <div className='w-[80px] flex justify-end border-1 p-1 border-bgRingGreen items-center rounded-lg font-semibold text-xl bg-bgLightGreen'>
          <span>{ticket.price}</span>
        </div>
      </button>
      ))}
    </div>
  )
}
