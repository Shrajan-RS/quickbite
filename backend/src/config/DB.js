import mongoose from "mongoose";

const connectDB = async () => {
  const name = "QuickBite";
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${name}`
    );

    console.log(
      `DB Connected Successfully!!! \n HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Failed to connect DB!! \n Error: ", error);
    process.exit(1);
  }
};

export default connectDB;
