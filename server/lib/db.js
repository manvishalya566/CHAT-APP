// import mongoose from "mongoose";

// export const connectDB=async()=>{
//   try{
//     mongoose.connection.on('connected',()=>console.log('Database connected'));
//     await mongoose.connect('${process.env.MONGODB_URI}/chat-app')

//   } catch(error){
//     console.log(error);
//   }
// }import mongoose from "mongoose";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("🔗 Connecting to:", process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`✅ Database connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
  }
};
