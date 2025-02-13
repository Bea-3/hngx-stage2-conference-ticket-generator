import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { StepsContainer } from "./StepsContainer";
import { Button } from "./utils/Button";
import { UploadToCloudinary } from "./utils/UploadToCloudinary";

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
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed p-6 text-center cursor-pointer"
        >
          <p>Drag & Drop your image here or click to upload</p>
          <input
            type="file"
            accept="image/png, image/jpeg, image/gif"
            onChange={(e) => handleFileChange(e.target.files[0])}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="block mt-2 bg-blue-500 text-white p-2 rounded"
          >
            {uploading ? "Uploading..." : "Select File"}
          </label>
          {errors.avatar && (
            <p className="text-red-500 text-sm">{errors.avatar}</p>
          )}
          {formData.avatar && (
            <img
              src={formData.avatar}
              alt="Avatar Uploaded"
              className="mt-4 w-24 h-24 rounded-full object-cover mx-auto bg-white"
            />
          )}
        </div>

        <hr className="bg-formHeadingBg w-full h-1 border-0 my-7" />

        {/* Full name */}
        <div>
          <label>Enter your full name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="">Enter your email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="hello@example.com"
            className="w-full p-2 border rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
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
          {errors.textarea && (
            <p className="text-red-500 text-sm mt-1">{errors.textarea}</p>
          )}
        </div>

        {/* buttons */}
        <div className="flex justify-center gap-8 mt-4 font-[Jejumyeongjo]">
          <Button
            type="button"
            onClick={prevStep}
            className="border-2 border-bgRingGreen text-bgInputLightGreen"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="border-2 border-bgRingGreen text-bgInputLightGreen hover:text-white hover:bg-bgInputLightGreen hover:border-0"
          >
            Get My Free Ticket
          </Button>
        </div>
      </form>
    </StepsContainer>
  );
};

export default AttendeeDetails;
