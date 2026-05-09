import {Route,Routes} from "react-router-dom"
import MainPage from "./Pages/MainPage"
import Login from "./Pages/Login"
import Register from "./Pages/Register" 
import useAuthStore from "./Stores/AuthStore"
import {Loader2} from "lucide-react"
import { useEffect } from "react"
const App = () => {
  const {AuthUser, isAuthentication,CheckAuth} = useAuthStore()
  const isUserAuthenticated = !!AuthUser
  useEffect(()=>{
    CheckAuth()
  },[CheckAuth])
  if(isAuthentication){
    return <div className="flex justify-center items-center h-screen "><Loader2 className="animate-spin w-10 h-10" /></div>
  }
  return (
    <>
    <Routes>
      <Route path="/" element={ 
        isUserAuthenticated ? <MainPage/> : <Login/>
       } />
      <Route path="/login" element={ 
        isUserAuthenticated ? <MainPage/> : <Login/>
       } />
      <Route path="/register" element={ 
        isUserAuthenticated ? <MainPage/> : <Register/>
       } />
    </Routes>
    </>
  )
}

export default App
