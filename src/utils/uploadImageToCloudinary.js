const uploadImageToCloudinary = async (file) => {
  const cloudName = "WalkWiseUserImage";
  const uploadPreset = "unsigned_preset";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();
  return data.secure_url; // This is the image URL
};

export default uploadImageToCloudinary;
