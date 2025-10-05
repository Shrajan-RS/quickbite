import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadImageToCloudinary = async (file) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const response = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    fs.unlinkSync(file);

    return response.secure_url;
  } catch (error) {
    fs.unlinkSync(file);
    console.log("File upload to cloudinary Error: ", error);
  }
};

export default uploadImageToCloudinary;
