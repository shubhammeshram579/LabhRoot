import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config();


const ConnectDB = async () => {
    try {

        const databaseconnection = await mongoose.connect(process.env.CONNECT_DB_URL)

        console.log("✅ MongoDB Connected Successfully!");
        
    } catch (error) {
        console.log("somthing database connection error", error.message)
        
    }

}

export default ConnectDB;