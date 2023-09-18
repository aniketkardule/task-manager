import mongoose from "mongoose";


const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.URI);
        console.log("Mongodb connected");
    }catch (error){
        console.log(error);
    }
}

export default connectDb;