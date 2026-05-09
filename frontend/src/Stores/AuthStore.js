import {create} from "zustand"
import axiosInstance from "../Libs/axiosInstance"
import {toast} from 'react-toastify'
const useAuthStore = create((set,get) => ({
    AuthUser:null,
    isAuthentication:false,
    DiaryData:[],
    CheckAuth:async()=>{
        set({isAuthentication:true})
        try {
            const res = await axiosInstance.get("auth/userMe",{withCredentials:true})
            set({AuthUser: res.data.user})
        } catch (error) {
            console.error("Error checking auth:", error)
        }
        finally{
            set({isAuthentication:false})
        }
    },

    Login:async(email,password)=>{
        try {
            await axiosInstance.post("auth/login",{email,password},{withCredentials:true })
            get().CheckAuth()
            toast.success("Login successful")
        } catch (error) {
            console.error("Login error:", error)
            const errorMessage = error.response?.data?.message || "Login failed"
            toast.error(errorMessage)
        }
    },
     Register:async(username,email,password,MobileNumber)=>{
        try {
            await axiosInstance.post("auth/register",{username,email,password,MobileNumber},{withCredentials:true })
            get().CheckAuth()
            toast.success("Registration successful")
        } catch (error) {
            console.error("Registration error:", error)
            const errorMessage = error.response?.data?.message || "Registration failed"
            toast.error(errorMessage)
        }
    },
    Logout:async()=>{
        try {
            await axiosInstance.post("auth/logout",{}, {withCredentials:true })
            set({AuthUser:null})
            toast.success("Logout successful")
        } catch (error) {
            console.log(error)
        }
    },
    DeleteAccount:async(UserId)=>{
        try {
            await axiosInstance.post("auth/deleteAccount",{userId:UserId}, {withCredentials:true})
            set({AuthUser:null})
            toast.success("Account deleted successfully")
        } catch (error) {
            console.log(error)
            const errorMessage = error.response?.data?.message || "Failed to delete account"
            toast.error(errorMessage)
        }
    },

    // Ediary Store
    AddRecords:async(caseNo,court,petitioners,hearingDate,district)=>{
        try {
            await axiosInstance.post("ediary/addDiaryData",{CaseNo: caseNo, Court: court, Petitioner: petitioners, Hearingdate: hearingDate, District: district},{withCredentials:true})
            toast.success("Record added successfully")
            get().GetDiaryData()
        } catch (error) {
            console.error("Error adding record:", error)
            const errorMessage = error.response?.data?.message || "Failed to add record"
            toast.error(errorMessage)
        }
    },
    GetDiaryData:async()=>{
        try {
            const res = await axiosInstance.get("ediary/getDiaryData",{withCredentials:true})
            set({DiaryData: res.data.diaryData})
        
        } catch (error) {
            console.error("Error fetching diary data:", error)
        }
    },
    DeleteRecord:async(id)=>{
        try {
            await axiosInstance.delete(`ediary/deleteRecord/${id}`,{withCredentials:true})
            toast.success("Record deleted successfully")
            get().GetDiaryData()
        } catch (error) {
                console.error("Error deleting record:", error)
        }
    },
    isSendingOtp:false,
    SendOtpButton:async(email)=>{
        set({isSendingOtp:true})
        try {
            await axiosInstance.post("auth/send-otp",{email},{withCredentials:true})
            toast.success("OTP sent to email successfully")
            console.log(email)
        } catch (error) {
            console.error("Error sending OTP:", error)
            const errorMessage = error.response?.data?.message || "Failed to send OTP"
            toast.error(errorMessage)
        }finally{
            set({isSendingOtp:false})
        }
    },
    VerifyOtp:async(UserId,otp)=>{
        try {
            await axiosInstance.post("auth/verify-otp",{UserId,otp},{withCredentials:true})
            toast.success("Email verified successfully")
            get().CheckAuth()
        } catch (error) {
            console.error("Error verifying OTP:", error)
            const errorMessage = error.response?.data?.message || "Failed to verify OTP"
            toast.error(errorMessage)
        }
    },
    SearchedCases:[],
    SearchCase:async(query)=>{
        try {
            const res = await axiosInstance.post("ediary/search-case",{query},{withCredentials:true})
            set({SearchedCases: res.data.cases})
        } catch (error) {
            console.error("Error searching cases:", error)
            // const errorMessage = error.response?.data?.message || "Failed to search cases"
            // toast.error(errorMessage)
        }
    },
    DeleteAllRecords:async()=>{
        try {
            await axiosInstance.post("ediary/delete-all-records",{}, {withCredentials:true})
            toast.success("All records deleted successfully")
            get().GetDiaryData()
        } catch (error) {
            console.error("Error deleting all records:", error)
            const errorMessage = error.response?.data?.message || "Failed to delete all records"
            toast.error(errorMessage)
        }
    }
}))

export default useAuthStore