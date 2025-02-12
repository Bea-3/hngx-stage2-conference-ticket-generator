import React, {useState, useEffect} from 'react';
import { StepsContainer } from './StepsContainer';
import { Button } from './utils/Button';


const AttendeeDetails = ({nextStep, prevStep, step, totalSteps}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
    textarea: "",
  });
  const [errors, setErrors] = useState({});

   // Load saved data from localStorage (if available)
   useEffect(() => {
    const savedData = localStorage.getItem("attendeeDetails");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

     // Clear error for the field being changed
     if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

   // Validate the form
   const validateForm = () => {
    let newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    
    if (!formData.avatar.trim()) {
      newErrors.avatar = "Avatar URL is required.";
    } else if (!/\.(jpeg|jpg|png|gif)$/.test(formData.avatar.toLowerCase())) {
      newErrors.avatar = "Enter a valid image URL (JPEG, JPG, PNG, GIF).";
    }

    // Optional textarea validation if needed
    if (formData.textarea.trim().length > 500) {
      newErrors.textarea = "Project description cannot exceed 500 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Save to localStorage
      localStorage.setItem("attendeeDetails", JSON.stringify(formData));
      console.log(localStorage)
      // Proceed to next step
      nextStep();
    }
  }
  return (
    <StepsContainer title="Attendee Details" step={step} totalSteps={totalSteps}>
      <form onSubmit={handleSubmit} className='bg-formBg border-1 border-bgLightGreen rounded-3xl p-6 my-7'>

      {/* Avatar URL input field */}
      <div className='bg-formHeadingBg border-1 border-bgLightGreen rounded-3xl text-center mb-4 p-1'>
        <label>Upload Profile Photo</label>
           <input 
           type="url" 
           name="avatar"
           value={formData.avatar}
           onChange={handleChange}
           placeholder='Paste your Image URL here'
           className='w-full p-2 border rounded'
           />
           {errors.avatar && <p className="text-red-500 text-sm">{errors.avatar}</p>}
      </div>

          <hr className='bg-formHeadingBg w-full h-1 border-0 my-7'/>

        {/* Full name */}
        <div>
        <label htmlFor="">Enter your full name</label>
        <input 
        type="text"
        name='fullName'
        value={formData.fullName}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="">Enter your email *</label>
          <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder='hello@example.com'
          className="w-full p-2 border rounded"
          />
           {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Text Area */}
        <div className="mb-4">
          <label className="block mb-2">About the project</label>
          <textarea 
            name="textarea"
            value={formData.textarea}
            onChange={handleChange}
            className="w-full p-2 border rounded min-h-[100px]"
          />
          {errors.textarea && <p className="text-red-500 text-sm mt-1">{errors.textarea}</p>}
        </div>

        {/* buttons */}
        <div className="flex justify-center gap-8 mt-4 font-[Jejumyeongjo]">
          <Button type="button" onClick={prevStep} className="border-2 border-bgRingGreen text-bgInputLightGreen">
            Back
          </Button>
          <Button type="submit" className="border-2 border-bgRingGreen text-bgInputLightGreen hover:text-white hover:bg-bgInputLightGreen hover:border-0">
            Get My Free Ticket
          </Button>
        </div>
    
      </form>
    </StepsContainer>
  )
}

export default AttendeeDetails