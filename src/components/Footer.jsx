import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaFacebookF, FaInstagram,  FaLinkedinIn, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from './utils/axios';

const Footer = ({isLoggedIn}) => {
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
        const response = await axiosInstance.post("/subscribe", { email })
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
    <footer className="bg-gradient-to-r from-blue-700 via-teal-600 to-indigo-600 text-white py-12 mt-1">
      <div className="container mx-auto px-6">
        {/* Footer Top Section */}
        <div className="flex flex-wrap justify-between mb-12">
          {/* About Us */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-100">About Us</h3>
            <p className="text-gray-300 text-sm mb-4">
              We are committed to providing top-quality products for all your needs. Discover the best deals, new arrivals, and exclusive offers.
            </p>
            <p className="text-gray-300 text-sm">
              © 2025 E-Commerce. All Rights Reserved.
            </p>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-100">Contact Us</h3>
            <ul className="text-gray-300 text-sm">
              <li className="flex items-center mb-2">
                <FaPhoneAlt className="mr-2 text-teal-400" /> <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center mb-2">
                <FaEnvelope className="mr-2 text-teal-400" /> <span>support@ecommerce.com</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-teal-400" /> <span>123 E-Commerce St, City, Country</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h3 className="text-xl font-bold mb-4 text-gray-100">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-blue-400 transform transition duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-pink-400 transform transition duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transform transition duration-300">
                <FaTimes size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-600 transform transition duration-300">
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section (Newsletter) */}
        <div className="flex flex-col items-center justify-center mt-8">
          <h3 className="text-2xl font-semibold text-gray-100 mb-4">Subscribe to our Newsletter</h3>
          <p className="text-gray-300 text-sm mb-4">Stay updated with our latest products and offers. Enter your email below to subscribe.</p>
          <form onSubmit={handleSubmit} className='w-full max-w-md'>
            <div className='w-full flex max-w-md'>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-l-lg border border-gray-600 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button type='submit' className="px-6 py-3 bg-teal-600 text-white rounded-r-lg hover:bg-teal-700 focus:outline-none">
              Subscribe
            </button>
            </div>
             {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
