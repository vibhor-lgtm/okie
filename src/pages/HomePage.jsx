import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import ShopByCategories from '../components/ShopByCategories'
import FeaturedProduct from "../components/FeaturedProduct"
import EmailSubscription from '../components/EmailSubscription'
import BestSeller from '../components/BestSeller'
import Footer from '../components/Footer'
const HomePage = ({isLoggedIn, setIsLoggedIn,userEmail}) => {
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userEmail={userEmail} />
      <HeroSection />
      <EmailSubscription isLoggedIn={isLoggedIn}/>
      <ShopByCategories />
      <FeaturedProduct />
      <BestSeller />
      <Footer isLoggedIn={isLoggedIn}/>
    </div>
  )
}

export default HomePage