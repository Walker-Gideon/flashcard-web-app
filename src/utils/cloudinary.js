export const handleImageUpload = async (file) => {
  const cloudName = "WalkWiseUserImage";
  const uploadPreset = "unsigned_preset";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await res.json();

    if (res.ok) {
      return data.secure_url; // ✅ Use this URL to save in Firebase or show image
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (err) {
    console.error("Cloudinary Upload Error:", err.message);
    return null;
  }
};
