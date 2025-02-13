
export const UploadToCloudinary = async (file) => {
    const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dz8bfoofx/upload";
    const UPLOAD_PRESET = "attendee_avatar";
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "ticz_avatars");
  
    try {
      const response = await fetch(CLOUDINARY_UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

    
    if (!response.ok) {
        return { success: false, error: "Failed to upload image. Try again." };
      }
  
      const data = await response.json();
  
      if (data.secure_url) {
        return { success: true, url: data.secure_url };
      } else {
        return { success: false, error: "Upload failed. Try again." };
      }
    } catch (error) {
        console.log("Error uploading image:", error);
      return { success: false, error: "Error uploading image." };
    }
  };
  