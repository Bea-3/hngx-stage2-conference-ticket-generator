import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { StepsContainer } from "./StepsContainer";
import { Button } from "./utils/Button";
import { UploadToCloudinary } from "./utils/UploadToCloudinary";
import envelopeIcon from "../../assets/icons/envelope.svg";
import uploadIcon from "../../assets/icons/uploadIcon.svg";

const AttendeeDetails = ({ nextStep, prevStep, step, totalSteps }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    avatar: "",
    textarea: "",
  });
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field being changed
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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

    if (!formData.avatar) {
      newErrors.avatar = "Profile photo is required";
    }

    // Optional textarea validation
    if (formData.textarea.trim().length > 500) {
      newErrors.textarea = "Project description cannot exceed 500 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = async (file) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 5 * 1024 * 1024; // 5MB limit

    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Only JPG, PNG, or GIF images are allowed.",
      }));
      return;
    }

    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        avatar: "File size must be under 5MB.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, avatar: "" }));
    setUploading(true);

    try {
      const imageUrl = await UploadToCloudinary(file);
      console.log('Uploaded image URL:', imageUrl.url);
      setFormData((prev) => ({ ...prev, avatar: imageUrl.url }));
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Failed to upload image. Try again.",
      }));
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      // Save to localStorage
      localStorage.setItem("attendeeDetails", JSON.stringify(formData));
      console.log(localStorage);
      // Proceed to next step
      nextStep();
    }
  };
  return (
    <StepsContainer
      title="Attendee Details"
      step={step}
      totalSteps={totalSteps}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-formBg border-1 border-bgLightGreen rounded-3xl p-6 my-7"
      >
        {/* Avatar File Upload / drag and drop*/}
        <div className="border border-bgdarkBorder p-6 rounded-3xl relative mb-4">
          <h3 className="mb-6">Upload Profile Photo</h3>

          <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="md:bg-bgDarkgreen p-6 text-center cursor-pointer h-[198px] rounded md:mb-4 mb-8 top-18 right-5"
        >
          <img src={uploadIcon} alt="Upload Icon " className="absolute md:top-30 md:left-70 z-50"/>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="flex  text-white p-2 rounded-3xl border-4 border-btnGreen w-[230px] h-[230px] absolute md:top-14 md:right-42 justify-center items-center top-18 right-5 bg-bgLightGreen text-base opacity-90"
          >
            {uploading ? "Uploading..." : "Drag & Drop your image here or click to upload"}
          </label>
          {errors.avatar && (
            <p className="text-red-500 text-sm">{errors.avatar}</p>
          )}
          {formData.avatar && (
            <img
              src={formData.avatar}
              alt="Avatar Uploaded"
              className="w-[230px] h-[230px] object-cover absolute rounded-2xl md:top-14 md:right-42 bg-white top-18 right-5 z-500 opacity-96 hover:opacity-100"
            />
          )}
        </div>
        </div>

        <hr className="bg-formHeadingBg w-full h-1 border-0 my-7" />

        {/* Full name */}
        <div className="mb-8">
          <label>Enter your name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg mt-2 border-bgdarkBorder"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* Email Field */}
        <div className="w-full mb-8">
  <label htmlFor="email" className="block mb-1">Enter your email *</label>
  
  <div className="relative w-full">
    {/* Icon inside input */}
    <img 
      src={envelopeIcon} 
      alt="envelope icon" 
      className="absolute left-3 top-7.5 md:top-7 transform -translate-y-1/2 w-5 h-5 text-white"
    />

    {/* Input Field */}
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="hello@example.com"
      className="w-full p-2 pl-10 border border-bgdarkBorder rounded-lg focus:ring-0 bg-inherit mt-2"
    />
  </div>

  {/* Validation Message */}
  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
</div>


        {/* Text Area */}
        <div className="mb-8">
          <label className="block mb-2">Special request?</label>
          <textarea
            name="textarea"
            value={formData.textarea}
            onChange={handleChange}
            className="w-full p-2 border border-bgdarkBorder rounded-lg min-h-[100px]"
          />
          {errors.textarea && (
            <p className="text-red-500 text-sm mt-1">{errors.textarea}</p>
          )}
        </div>

        {/* buttons */}
        <div className="flex flex-col-reverse md:flex-row justify-center gap-3 md:gap-8 mt-4 font-jeju">
          <Button
            type="button"
            onClick={prevStep}
            className="border border-bgRingGreen text-bgInputLightGreen w-[270px] hover:text-white hover:bg-bgHover"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="border border-bgRingGreen text-bgInputLightGreen hover:text-white hover:bg-bgHover hover:border-0  w-[270px]"
          >
            Get My Free Ticket
          </Button>
        </div>
      </form>
    </StepsContainer>
  );
};

export default AttendeeDetails;
