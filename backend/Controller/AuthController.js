import User from "../Models/AuthModel.js"
import Ediary from "../Models/EdiaryModel.js"
import bcrypt from "bcryptjs"
import { sendOTPEmail } from "../Utlis/EmailVerificationSystem.js"
import { sendOTPPhone } from "../Utlis/TwillioMobilenumberSender.js"
export const RegisterUser=async(req,res)=>{
    const {username,email,password,MobileNumber}= req.body
    try {
        if(!username || !email || !password || !MobileNumber){
            return res.status(400).json({message:"All fields are required"})
        }
        const UserExist = await User.findOne({email})
        if(UserExist){
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPasword = await bcrypt.hash(password,10)
        const NewUser = new User({
            username,
            email,
            password:hashedPasword,
            MobileNumber
        })
        await NewUser.save()

        return res.status(201).json({message:"User registered successfully"})
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}
export const LoginUser=async(req,res)=>{
    const {email,password}= req.body
    try {
        const UserExist = await User.findOne({email})
        if(!UserExist){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const isMatch = await bcrypt.compare(password,UserExist.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        req.session.userId = UserExist._id
        return res.status(200).json({message:"Login successful"})
    } catch (error) {   
        res.status(500).json({message:"Server Error"})
    }
}
export const UserMe=async(req,res)=>{
    try {
        if (!req.session.userId) {
            return res.status(401).json({message:"Not authenticated"})
        }
        const user = await User.findById(req.session.userId)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json({user})

    } catch (error) {
        // res.status(500).json({message:"Server Error"})
        // console.log(error)
    }
}
export const LogoutUser=async(req,res)=>{
    try {
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
                return res.status(500).json({message:"Logout failed"})
            }
            res.clearCookie("connect.sid")
            return res.status(200).json({message:"Logout successful"})
        })
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
}
export const GenerateOtp= async(req,res)=>{
    const {email} = req.body
    try {
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            user.emailOtp = otp
             user.emailOtpExpiry = Date.now() + 10 * 60 * 1000;
            await user.save()
            await sendOTPEmail(email,otp)
            res.status(200).json({message:"OTP generated and sent to email"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}

export const VerifyOtp= async(req,res)=>{
    const {UserId,otp} = req.body
    try {
        const user  = await User.findOne({_id:UserId})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(user.emailOtp !== otp || user.emailOtpExpiry < Date.now()){
            return res.status(400).json({message:"Invalid or expired OTP"})
        }
        user.isEmailVerified = true
        user.emailOtp = null
        user.emailOtpExpiry = null
        await user.save()
        res.status(200).json({message:"Email verified successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}

export const DeleteAccountAndData= async(req,res)=>{
    const {userId} = req.body
    try {
        const user = await User.findOne({_id:userId})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const UserData = await Ediary.deleteMany({userId:userId})
        if(UserData){
            await User.deleteOne({_id:userId})
            return res.status(200).json({message:"User account and data deleted successfully"})
        }
        user.deleteOne({_id:userId})
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
                return res.status(500).json({message:"Deleting Session failed"})
            }
            res.clearCookie("connect.sid")

        })
        return res.status(200).json({message:"User account deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server Error"})
    }
}

