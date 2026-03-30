import mongoose from "mongoose";

export const connectDB = async () => {
  const DB = process.env.MONGO_URI;

  try {
    const conn = await mongoose.connect(DB);

    console.log(`❤️MongoDB Connected❤️`);
  } catch (err) {
    console.log(`Error connecting DB : ${err.message}`);
    process.exit(1); //1 failure &  0 success
  }
};
