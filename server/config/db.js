import mongoose from 'mongoose'

const connectDB = async ()=> {
    const DB_URI = process.env.DB_URI
    try{
        await mongoose.connect(DB_URI)
        console.log('Database connected');
    }
    catch(err){
        console.log(err.message);
    }
} 
export default connectDB