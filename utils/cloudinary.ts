export async function uploadImagesToCloudinary(files: File[]) {
  const cloudName = "dror6ccet"; // ✅ your actual Cloudinary cloud name
  const uploadPreset = "rental_unsigned"; // ✅ the unsigned preset you created
  const folder = "rental/photos"; // ✅ target folder

  const urls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", folder);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (data.secure_url) {
      urls.push(data.secure_url);
    } else {
      console.error("Upload error:", data); // ✅ will show message like "Unknown API key"
      throw new Error(data?.error?.message || "Image upload failed");
    }
  }

  return urls;
}
