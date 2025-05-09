import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../components/utils/axios";
const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Simulate the login logic (you can replace this with your real authentication logic)
      const response = await axiosInstance.post("/login",{ email, password},{withCredentials:true})
      
      
      if (response.data) {
        toast.success("successfully logged in");
        setIsLoggedIn(true);
        localStorage.setItem("Email",response.data.email)
        navigate("/");
      }
    } catch (error) {
      toast.error("Invalid credentials!");
      console.log("error in login page");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6  mt-20">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-all"
        >
          Login
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;
