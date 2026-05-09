import { Router } from "express";
import { RegisterUser, LoginUser, UserMe,LogoutUser,GenerateOtp ,VerifyOtp,DeleteAccountAndData} from "../Controller/AuthController.js";
import { AuthSession } from "../Middlewares/AuthSession.js";
const router= Router()

router.post("/register",RegisterUser )
router.post("/login", LoginUser)
router.get("/userMe", AuthSession, UserMe)
router.post("/logout",LogoutUser)
router.post("/deleteAccount", AuthSession, DeleteAccountAndData)
// Email Otp System

router.post("/send-otp",GenerateOtp)
router.post("/verify-otp", AuthSession, VerifyOtp)


export default router
