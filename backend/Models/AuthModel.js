import mongoose from "mongoose";


const authSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{ 
        type:String,
        required:true
    },
     MobileNumber:{
            type: String,
            required: true,
        }
    ,isMobileVerified:{
        type:Boolean,
        default:false
    },
    isEmailVerified:{
        type:Boolean,
        default:false
    },
    emailOtp:{
        type:String
    },
    emailOtpExpiry:{
        type:Date
    },
},{timestamps:true})


    const User = mongoose.model("Auth",authSchema)

    export default User