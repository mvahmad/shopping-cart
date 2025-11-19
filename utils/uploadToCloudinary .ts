export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("https://elite-sport-backend.vercel.app/api/cloudinary-post", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (res.ok && data.cloudinaryUrl) return data.cloudinaryUrl;
  throw new Error(data.message || "Cloudinary upload failed");
};
