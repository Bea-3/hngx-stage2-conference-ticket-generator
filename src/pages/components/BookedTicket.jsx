import React, {useState, useEffect} from 'react'
import { StepsContainer } from './StepsContainer';
import { Button } from './utils/Button';

const BookedTicket = ( {prevStep, resetForm, step, totalSteps}) => {
  const [attendeeDetails, setAttendeeDetails] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const savedAttendee = JSON.parse(localStorage.getItem("attendeeDetails"));
    const savedTicket = JSON.parse(localStorage.getItem("selectedTicket"));

    if (savedAttendee && savedTicket) {
      setAttendeeDetails(savedAttendee);
      setSelectedTicket(savedTicket);
    }
  }, []);

   // Handle ticket download (can be expanded to generate a PDF)
   const handleDownload = () => {
    alert("Download functionality will be implemented here.");
  };

  // If data is missing, return a loading state
  if (!attendeeDetails || !selectedTicket) {
    return <p className="text-center text-xl">Loading ticket details...</p>;
  }

  return (
    <StepsContainer title="Ready" step={step} totalSteps={totalSteps}>
        <div className="bg-white shadow-lg rounded-xl p-6 text-center max-w-md mx-auto border border-bgLightGreen">
        
        {/* Avatar */}
        <div className="flex justify-center">
          <img
            src={attendeeDetails.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
        </div>

        {/* User Details */}
        <h2 className="text-2xl font-semibold mt-4">{attendeeDetails.fullName}</h2>
        <p className="text-gray-600">{attendeeDetails.email}</p>

        {/* Ticket Details */}
        <div className="mt-4 border-t pt-4">
          <p className="text-lg font-bold">Ticket Type:</p>
          <p className="text-xl text-bgRingGreen">{selectedTicket.type} Access</p>
          <p className="text-gray-500">Price: {selectedTicket.price}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <Button className="border-2 border-bgRingGreen" onClick={handleDownload}>
            Download Ticket
          </Button>
          <Button className="border-2 border-red-500 text-red-500" onClick={resetForm}>
            Book Another Ticket
          </Button>
        </div>

      </div>
        </StepsContainer>
  )
}

export default BookedTicket