import mongoose from "mongoose";
import { MONGO_URI } from "./env.js";


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI,{dbName:"form-backend"});
    console.log(`Successfully connnected to mongoDB 👍`);
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;