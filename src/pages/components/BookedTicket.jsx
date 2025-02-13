import React, {useState, useEffect, useRef} from 'react'
import { StepsContainer } from './StepsContainer';
import { Button } from './utils/Button';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BookedTicket = ( {prevStep, resetForm, step, totalSteps}) => {
  const [attendeeDetails, setAttendeeDetails] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketCount, setTicketCount] = useState(null);
  const ticketRef = useRef(null); 

  useEffect(() => {
    const savedAttendee = JSON.parse(localStorage.getItem("attendeeDetails"));
    const savedTicket = JSON.parse(localStorage.getItem("selectedTicket"));
    const savedTicketCount = JSON.parse(localStorage.getItem("ticketCount"));
    console.log(localStorage)

    if (savedAttendee && savedTicket && savedTicketCount) {
      setAttendeeDetails(savedAttendee);
      setSelectedTicket(savedTicket);
      setTicketCount(savedTicketCount);
    }
  }, []);

   // Handle ticket download as PDF
   const handleDownload = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, { scale: 1 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait mode, millimeters, A4 size
    const imgWidth = 100; // Adjust width for PDF
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

    pdf.addImage(imgData, 'PNG', 15, 10, imgWidth, imgHeight);
    pdf.save('TechemberFest_Ticket.pdf');
  };

  // If data is missing, return a loading state
  if (!attendeeDetails || !selectedTicket || !ticketCount) {
    return <p className="text-center text-xl">Loading ticket details...</p>;
  }

  return (
    <StepsContainer title="Ready" step={step} totalSteps={totalSteps}>
        {/* ticket display */}
      <div className='flex flex-col w-full justify-center gap-5'>
        <div>
        <h2 className='font-[Alatsi] text-[32px] m-4 text-center'>Your Ticket is Booked!</h2>
        <p className='font-[Roboto] mb-4 text-center'>Check your email for a copy or you can <b>download</b></p>
        </div>

        {/* Ticket with details */}
      <div className=' flex justify-center content-center'>
        {/* ticket container with the downloable ticket */}
        <div ref={ticketRef} className='w-[300px] h-[600px] p-4 ticket bg-cover bg-center'>
            <div className='flex flex-col gap-2 justify-center items-center border border-btnGreen rounded-2xl mt-2 '>
              {/* heading */}
              <div className='text-center' >
                <h3  className='font-[RoadRage] md:text-[30px]  text-2xl my-2'>Techember Fest ”25</h3>
                <p className='text-[10px]'>📍 04 Rumens road, Ikoyi, Lagos</p>
                <p className='text-[10px]'>📅 March 15, 2025 | 7:00 PM</p>
              </div>

              {/* display avatar */}
              <div className='border-2 rounded-xl w-[140px] h-[140px] bg-btnGreen my-2'>
                <img src={attendeeDetails.avatar} alt="User Avatar" className='w-full h-full rounded-xl' />
              </div>

              {/* User Info */}
              <div className='grid grid-cols-2 w-[235px] border border-bgdarkBorder bg-bgUserInfo gap-0 p-1 rounded-xl mb-4'>
                <div className='w-full h-[45px] border-b-1 border-r-1 border-bgdarkBorder flex flex-col gap-2 px-2'>
                  <h5 className='text-[10px] opacity-50'>Enter your name</h5>
                  <p className='text-xs font-bold'>{attendeeDetails.fullName}</p>
                </div>
                <div className='w-full h-[45px] border-b-1 border-bgdarkBorder flex flex-col gap-2 px-2'>
                  <h5 className='text-[10px] opacity-50'>Enter your email *</h5>
                  <p className='text-[11px] font-bold'>{attendeeDetails.email}</p>
                </div>
                <div className='w-full h-[45px] border-b-1 border-r-1 border-bgdarkBorder flex flex-col gap-2 px-2'>
                  <h5 className='text-[10px] opacity-50'>Ticket Type:</h5>
                  <p className='text-xs font-bold'>{selectedTicket.type}</p>
                </div>
                <div className='w-full h-[45px] border-b-1 border-bgdarkBorder  flex flex-col gap-2 px-2'>
                  <h5 className='text-[10px] opacity-50'>Ticket for:</h5>
                  <p className='text-xs font-bold'>{ticketCount}</p>
                </div>
                <div className='col-span-2 w-full h-[60px] border-bgdarkBorder flex flex-col gap-1 p-2'>
                  <h5 className='text-[10px] opacity-50'>Special request?</h5>
                  <p className='text-xs font-bold'>{attendeeDetails.textarea}</p>
                </div>                
              </div>
            </div>

            {/* Barcode */}
            <div className='mt-14 flex justify-center items-center '>
            <Barcode
                value="123456789" // Unique value for the barcode
                format="CODE39" // Barcode format
                width={1.2} // Width of the barcode
                height={40} // Height of the barcode
                displayValue={true} // Show the value below the barcode
                fontSize={14} // Font size of the displayed value
                margin={5}
                lineColor="#fff"
                background="none"
                textAlign='center'
              />
            </div>
        </div>
      </div>

       {/* Buttons */}
       <div className='flex flex-col md:flex-row justify-between gap-8 mt-4 rounded-3xl font-[Jejumyeongjo]'>
        <Button type="button" className="border border-bgRingGreen text-bgInputLightGreen md:w-[193px] w-full hover:text-white hover:bg-bgInputLightGreen" onClick={resetForm}>
            Book Another Ticket
          </Button>
          <Button type="button" className="border border-bgRingGreen text-bgInputLightGreen md:w-[387px] w-full hover:text-white hover:bg-bgInputLightGreen hover:border-0" onClick={handleDownload}>
            Download Ticket
          </Button>
          
        </div>

      </div>
        </StepsContainer>
  )
}

export default BookedTicket