import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { axiosInstance } from '../components/utils/axios';
const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/signup`, { username, email, password })
      if(response.data){
        toast.success("Sign Up successfully ")
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.message)
      console.log("error in signup page")
    }
   
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-20">
      <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
      <input
          type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
       
        <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all">
          Sign Up
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
