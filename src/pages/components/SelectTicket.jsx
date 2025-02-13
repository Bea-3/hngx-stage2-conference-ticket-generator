import React, { useState, useEffect } from "react";
import { StepsContainer } from "./StepsContainer";
import { Button } from "./utils/Button";
import { TicketOptions } from "./utils/TicketOptions";

// passing props
const SelectTicket = ({ nextStep, step, totalSteps }) => {
  const initialFormData = { selectedTicket: null, ticketCount: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if form has been submitted

  // Validate form whenever formData changes
  useEffect(() => {
    if (isSubmitted) {
      validateForm();
    }
  }, [formData, isSubmitted]);

  // Form validation function
  const validateForm = () => {
    if (!formData.selectedTicket) {
      setError("Please select a ticket type");
      setIsFormValid(false);
      return;
    }
    if (!formData.ticketCount) {
      setError("Please select the number of tickets");
      setIsFormValid(false);
      return;
    }
    setError("");
    setIsFormValid(true);
  };

  // handle ticket selection
  const handleTicketSelection = (ticket) => {
    setFormData((prev) => ({
      ...prev,
      selectedTicket: ticket,
    }));
  };

  // handle number of tickets
  const handleTicketCountChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      ticketCount: event.target.value,
    }));
  };

  // handle submit and form handling
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    setIsSubmitted(true);
    if (!isFormValid) {
      return;
    }

    // Save to local storage only when the user moves to the next step
    localStorage.setItem(
      "selectedTicket",
      JSON.stringify(formData.selectedTicket)
    );
    localStorage.setItem("ticketCount", formData.ticketCount);
    console.log(localStorage);
    nextStep(); // Proceed to the next step
  };

  // Handle Cancel button click - reset everything
  const handleCancel = () => {
    setFormData(initialFormData);
    setError("");
    setIsFormValid(false);
    setIsSubmitted(false);
    localStorage.removeItem("selectedTicket"); // Clear local storage
    localStorage.removeItem("ticketCount");
    console.log(localStorage);
  };

  return (
    <StepsContainer
      title="Ticket Selection"
      step={step}
      totalSteps={totalSteps}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-formBg border-1 border-bgLightGreen rounded-3xl p-6 my-7"
      >
        {/* heading */}
        <div className="bg-formHeadingBg border-1 border-bgLightGreen rounded-3xl text-center mb-4 p-1 bg-gradient">
          <h2 className="font-roadrage text-5xl md:text-6xl my-2">
            Techember Fest ”25
          </h2>
          <p className=" md:text-base text-xs my-2">
            Join us for an unforgettable experience at <br />
            [Event Name]! Secure your spot now.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3 my-3 text-xs md:text-base">
            <div className="flex gap-2">
              <p>📍 [Event Location]</p>
            </div>
            <span className="hidden md:block">||</span>
            <div className="flex gap-2">
              <p>March 15, 2025</p> | <p>7:00 PM</p>
            </div>
          </div>
        </div>

        <hr className="bg-formHeadingBg w-full h-1 border-0 my-7" />

        {/* select ticket */}
        <div>
          <p>Select Ticket Type:</p>

          {/* card group with 3 tickets */}
          <TicketOptions setSelectedTicket={handleTicketSelection} />
        </div>
        {/* Error Message */}
        {error && (
          <p className="text-red-500 mt-3 mb-0 text-sm ml-1">{error}</p>
        )}

        {/* Select Number of Tickets */}
        <div className="mt-7 md:mt-4 mb-8">
          <p>Number of Tickets</p>
          <select
            name=""
            id=""
            value={formData.ticketCount}
            onChange={handleTicketCountChange}
            className="w-full bg-inherit border-1 border-bgLightGreen p-3 rounded-xl mt-2 px-4
          "
          >
            <option
              className="bg-formHeadingBg hover:bg-formHeadingBg focus:bg-formHeadingBg"
              value=""
            >
              Select
            </option>
            <option className="bg-formHeadingBg" value="1">
              1
            </option>
            <option className="bg-formHeadingBg" value="2">
              2
            </option>
          </select>
        </div>

        <div className="flex flex-col-reverse md:flex-row justify-between gap-3 md:gap-8 mt-4 rounded-3xl font-jeju">
          {/* on cancel, clear the form data */}
          <Button
            type="button"
            className="border-1 border-bgRingGreen text-bgInputLightGreen w-full md:w-[266px] hover:text-white hover:bg-bgHover"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`border-1 border-bgRingGreen md:w-[266px] w-full hover:text-white hover:bg-bgHover ${
              isFormValid
                ? "text-bgInputLightGreen hover:text-white hover:bg-bgInputLightGreen hover:border-0"
                : "text-bgInputLightGreen cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            Next
          </Button>
        </div>
      </form>
    </StepsContainer>
  );
};

export default SelectTicket;
