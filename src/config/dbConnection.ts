import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export class dbConnection {
    static async connect() {
       try{

           await mongoose.connect((process.env.MONGODB_URL || 'mongodb://localhost:27017/') + process.env.DATABASE_NAME)
           console.log("Database connected successfully");
        }
        catch(err)
        {
            console.log("Database connection failed : ", err);
            throw err;
        }
  
    };

}

