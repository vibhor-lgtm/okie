
import { Route, Router, Routes } from 'react-router-dom'
import './App.css'
import SplashScreen from './components/SplashScreen'
import HomePage from './pages/HomePage'
import Login from "./pages/Login"
import SignUp from './pages/SignUp'
import RentNowPage from './pages/RentNowPage'
import BuyNowPage from './pages/BuyNowPage'
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import TransactionPage from './pages/TransactionPage'

function App() {
   
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("")
  useEffect(()=>{
    const email = localStorage.getItem("Email")
    setUserEmail(email)
  },[isLoggedIn])
  return (
    <>
    <SplashScreen />
    <Routes>
    <Route path="/" element={<HomePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userEmail={userEmail} />}/>
    <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
    <Route path="/signup" element={<SignUp />} />
    <Route path='/rent' element={<RentNowPage isLoggedIn={isLoggedIn} userEmail={userEmail} />}  />
    <Route path='/buy' element={<BuyNowPage isLoggedIn={isLoggedIn} userEmail={userEmail} />} />
    <Route path='/transaction' element={<TransactionPage />} />
    </Routes>
    <Toaster />
    
    </>
  )
}

export default App
