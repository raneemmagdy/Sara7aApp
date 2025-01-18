import mongoose from "mongoose";

const checkDBConnection=async()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected successfully....');
    
  } catch (error) {
    console.log('MongoDB can not connect successfully....');
  }
}
export default checkDBConnection