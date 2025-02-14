import React, { useState } from "react";

const ticketType = [
  { type: "REGULAR", price: "Free", ticketsLeft: 20 },
  { type: "VIP", price: "$50", ticketsLeft: 20 },
  { type: "VVIP", price: "$150", ticketsLeft: 20 },
];

export const TicketOptions = ({ setSelectedTicket }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (ticket) => {
    setSelected(ticket.type);
    setSelectedTicket(ticket);
  };

  return (
    <div className="border-1 border-bgLightGreen p-4 rounded-3xl flex flex-col md:flex-row justify-between mt-2  gap-4 md:gap-1 ">
      {/* 3 cards with the ticket types */}
      {ticketType.map((ticket) => (
        <button
          type="button"
          key={ticket.type}
          onClick={() => handleSelect(ticket)}
          className={`border-1 border-bgLightGreen p-3 w-full md:w-[160px] hover:bg-bgHover ${
            selected === ticket.type ? "bg-bgRingGreen" : "bg-inherit"
          } rounded-2xl active:bg-bgRingGreen`}
        >
          <div className="flex flex-col gap-2 text-start">
            <p className="font-semibold text-xl">{ticket.price}</p>
            <div>
              <h3>
                {ticket.type} <span>ACCESS</span>
              </h3>
              <p>
                <span>{ticket.ticketsLeft}</span> /52
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};
