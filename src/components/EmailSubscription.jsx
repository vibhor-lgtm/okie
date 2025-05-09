import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from './utils/axios';

const EmailSubscription = ({isLoggedIn}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate()
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setSuccess('');
      return;
    }

  if(isLoggedIn){
    try {
      const response = await axiosInstance.post("/subscribe", {email})
    } catch (error) {
      console.log(error.message)
    }
    // If email is valid, show success message
    setError('');
    setSuccess('Thank you for subscribing!');


    // Clear the email input
    setEmail('');
  }else{
    toast.error("please login")
    navigate("/login")
  }
}

  return (
    <section className="py-12  bg-gray-100">
      <div className="container mx-auto text-center px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Stay Updated!</h2>
        <p className="text-lg text-gray-600 mb-6">Subscribe to our newsletter to get the latest updates and offers.</p>

        <div className="w-full md:w-[60%]   mx-auto md:p-8">
          {/* Email Form */}
          <form onSubmit={handleSubmit} className="flex items-center  md:space-x-4">
            {/* Email Input */}
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="flex-1 p-3 text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-yellow-500 flex text-white p-3  md:px-6  md:py-3 rounded-md text-base md:text-md font-semibold hover:bg-yellow-400 transition-all duration-300"
            >
              Subscribe <span className='hidden md:flex ps-1'>Now</span>
            </button>
          </form>

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
        </div>
      </div>
    </section>
  );
};

export default EmailSubscription;
