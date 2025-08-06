export const handleImageUpload = async (file) => {
  const cloudName = "your_cloud_name";
  const uploadPreset = "your_upload_preset";

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

  if (!res.ok) {
    throw new Error("Image upload failed.");
  }

  const data = await res.json();
  return data.secure_url;
};
