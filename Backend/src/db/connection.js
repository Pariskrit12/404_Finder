import moongose from "mongoose";
import { DB_NAME } from "../constant.js";
const connection=async()=>{
    try{
        const connectionInstance=await moongose.connect(`${process.env.MONOGODB_URI}${DB_NAME}`);
        console.log(`MongoDB Successfully Connected At Host ${connectionInstance.connection.host}`);
        
    }catch(error){
        console.log("MongoDB Error",error);
        process.exit(1)//means exit with a failure/error code.
        //process.exit(0) → means exit successfully (no errors).
    }
}

export default connection;