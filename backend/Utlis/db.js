import mongoose from "mongoose";

const ConnectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGOURI).then((g)=>{console.log("Connected to MongoDB-"+g.connection.host)});
    } catch (error) {
            console.log(error);
    }
}

export default ConnectDB;