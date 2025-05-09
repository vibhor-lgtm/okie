import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import {
  FaSearch,
  FaUser,
  FaTimes,
  FaBars,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "./utils/axios";

const Navbar = ({ isLoggedIn, setIsLoggedIn, userEmail }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isAddCashDropdownOpen, setIsAddCashDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDetails, setProfileDetails] = useState(null);
  const [orders, setOrders] = useState({ rentals: [], purchases: [] });

  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const addCashDropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileDropdown = async () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    if (!isProfileDropdownOpen && isLoggedIn) {
      try {
        const res = await axiosInstance.get(`/profile?email=${userEmail}`)
        // const res = await axios.get(`http://localhost:3000/api/profile?email=${userEmail}`);
        setProfileDetails(res.data);
      } catch (error) {
        toast.error("Failed to load profile");
      }
    } else if (!isLoggedIn) {
      toast.error("Please login");
    }
  };

  const handleOrdersClick = async () => {
    if (isLoggedIn) {
      try {
        const res = await axiosInstance.get(`/orders?email=${userEmail}`)
        // const res = await axios.get(`http://localhost:3000/api/orders?email=${userEmail}`);
        setOrders(res.data);
      } catch (error) {
        toast.error("Failed to load orders");
      }
    } else {
      toast.error("Please login");
    }
  };

  const toggleAddCashDropdown = () => {
    setIsAddCashDropdownOpen(!isAddCashDropdownOpen);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("Email");
    window.location.reload();
    toast.success("Logged Out successfully");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        addCashDropdownRef.current &&
        !addCashDropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setIsProfileDropdownOpen(false);
        setIsAddCashDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 border p-5">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-2xl flex items-center gap-3 font-bold">
          <img className="h-12" src="/images/logo.png" alt="logo" />
          OKIE
        </Link>

        {/* Desktop Search - Hidden on mobile */}
        <div className="hidden lg:flex items-center lg:w-[40%] relative">
          <input
            type="text"
            placeholder="What are you looking for?"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 pl-10 pr-4 rounded-full text-gray-800"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              <FaTimes />
            </button>
          )}
          <button className="bg-blue-600 px-6 py-2 rounded-full ml-2 text-white">
            Search
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6 text-white">
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="flex items-center hover:text-teal-100"
            >
              <FaUser className="mr-2" /> Profile
            </button>
            {isProfileDropdownOpen && (
              <div
                ref={profileDropdownRef}
                className="absolute z-50 right-0 mt-2 w-72 bg-white border rounded-md shadow-lg"
              >
                <button
                  onClick={() => setIsProfileDropdownOpen(false)}
                  className="absolute top-2 right-2 text-gray-700"
                >
                  <FaTimes />
                </button>
                <div className="p-4">
                  <h4 className="text-gray-700 font-bold mb-2">Profile</h4>
                  {profileDetails ? (
                    <>
                      <p className="text-gray-600"><strong>Name:</strong> {profileDetails.name}</p>
                      <p className="text-gray-600"><strong>Email:</strong> {profileDetails.email}</p>
                      <button
                        onClick={handleOrdersClick}
                        className="mt-3 text-teal-700 underline"
                      >
                        View Orders
                      </button>
                    </>
                  ) : (
                    <p>Loading...</p>
                  )}
                  {orders.rentals.length > 0 && (
                    <>
                      <h4 className="mt-3 font-bold text-gray-800">Your Rentals</h4>
                      {orders.rentals.map((r, i) => (
                        <p className="text-gray-600" key={i}>{r.category} for {r.duration} days</p>
                      ))}
                    </>
                  )}
                  {orders.purchases.length > 0 && (
                    <>
                      <h4 className="mt-3 font-bold text-gray-800">Your Purchases</h4>
                      {orders.purchases.map((b, i) => (
                        <p className="text-gray-600" key={i}>{b.category} - Qty: {b.quantity}</p>
                      ))}
                    </>
                  )}
                  {
                    isLoggedIn ? (
                      <button
                        onClick={handleLogOut}
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                      >
                        <FaSignOutAlt className="inline mr-2" /> Logout
                      </button>
                    ) : (
                      <Link to="/login"
                        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
                      >
                        <FaSignInAlt className="inline mr-2" /> Login
                      </Link>
                    )
                  }
                </div>
              </div>
            )}
          </div>

          

          {isLoggedIn ? (
            <button
              onClick={handleLogOut}
              className="bg-teal-500 text-white py-2 px-4 rounded-full hover:bg-teal-600"
            >
              Logout
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="bg-teal-500 text-white py-2 px-4 rounded-full"
              >
                Login
              </button>
              {isDropdownOpen && (
                <div className="absolute z-50 right-0 mt-2 w-64 bg-white border rounded-md shadow-lg">
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="absolute top-2 right-2 text-gray-700"
                  >
                    <FaTimes />
                  </button>
                  <div className="p-4">
                    <h4 className="text-gray-700 font-bold mb-2">Login</h4>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                  </div>
                  <div className="p-4 border-t">
                    <h4 className="text-gray-700 font-bold mb-2">Sign Up</h4>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Sign Up
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-4 text-white">
          {isLoggedIn && profileDetails && (
            <div className="bg-white text-gray-800 rounded p-4">
              <h4 className="font-bold mb-1">Profile</h4>
              <p><strong>Name:</strong> {profileDetails.name}</p>
              <p><strong>Email:</strong> {profileDetails.email}</p>
              <button
                onClick={handleOrdersClick}
                className="text-teal-700 underline mt-2"
              >
                View Orders
              </button>
            </div>
          )}

          {orders.rentals.length > 0 && (
            <div className="bg-white text-gray-800 rounded p-4">
              <h4 className="font-bold mb-2">Your Rentals</h4>
              {orders.rentals.map((r, i) => (
                <p key={i}>{r.category} for {r.duration} days</p>
              ))}
            </div>
          )}

          {orders.purchases.length > 0 && (
            <div className="bg-white text-gray-800 rounded p-4">
              <h4 className="font-bold mb-2">Your Purchases</h4>
              {orders.purchases.map((p, i) => (
                <p key={i}>{p.category} - Qty: {p.quantity}</p>
              ))}
            </div>
          )}

          {isLoggedIn ? (
            <>
              
              <button onClick={handleLogOut} className="bg-red-500 text-white py-2 px-4 rounded w-full">
                <FaSignOutAlt className="inline mr-2" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-teal-500 text-white py-2 px-4 rounded block text-center">
                <FaSignInAlt className="inline mr-2" /> Login
              </Link>
              <Link to="/signup" className="bg-blue-500 text-white py-2 px-4 rounded block text-center">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
