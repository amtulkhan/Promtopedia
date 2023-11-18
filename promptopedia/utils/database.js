import mongoose from "mongoose"

let isConnect =false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery',true);
    if(isConnect){
        console.log("DB is connected");
    }
    else{
        try{
            await mongoose.connect(process.env.MONGODB_URI,{
                dbName:"share_prompt",
                useNewURLParser:true,
                useUnifiedTopology:true
            })
            isConnect = true;
            console.log("Database Connected");

        }
        catch(error){
            console.log(error);

        }
    }
}