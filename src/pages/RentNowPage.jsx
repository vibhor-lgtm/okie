import React, { useState } from "react";
import { axiosInstance } from "../components/utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const RentNowPage = ({ isLoggedIn, userEmail }) => {
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email:userEmail,
    phone: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in userInfo) {
      setUserInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      if (name === "category") setCategory(value);
      if (name === "duration") setDuration(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone } = userInfo;
    // Here you can handle the form submission, e.g., send data to a server
    console.log(name);
    if (isLoggedIn) {
      try {
         const response = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/rent`,{ name, email, phone, category, duration },{withCredentials:true})
        

        if (response.data.rental) {
          toast.success("Sending data successfull");
          navigate("/")
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message);
      }
    }else{
      toast.error("please login ")
      navigate("/login")
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-8 my-4 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Rent Your Fashion Now
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-lg font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-semibold">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            readOnly
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            placeholder="Enter your email address"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-lg font-semibold">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userInfo.phone}
            onChange={handleInputChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-lg font-semibold">
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleInputChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select a category</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="sportswear">Sportswear</option>
            <option value="party">Party</option>
            <option value="vintage">Vintage</option>
          </select>
        </div>

        <div>
          <label htmlFor="duration" className="block text-lg font-semibold">
            Rental Duration
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={duration}
            onChange={handleInputChange}
            className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
            placeholder="Enter duration in days"
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold mt-6 transition-all duration-300 hover:bg-blue-400 transform hover:scale-105"
          >
            Submit Rental Request
          </button>
        </div>
      </form>
    </section>
  );
};

export default RentNowPage;
