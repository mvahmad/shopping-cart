import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "No image provided" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: file.type });

    // Cloudinary upload
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET!;

    const cloudinaryForm = new FormData();
    cloudinaryForm.append("file", blob, (file as File).name);
    cloudinaryForm.append("upload_preset", uploadPreset);

    const upload = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: cloudinaryForm,
      }
    );

    const data = await upload.json();

    if (!upload.ok) {
      return NextResponse.json(
        { message: data.error?.message || "Cloudinary upload failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ cloudinaryUrl: data.secure_url });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Server error" },
      { status: 500 }
    );
  }
}
