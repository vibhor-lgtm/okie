import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative w-full h-auto bg-gray-200 text-white p-4">
      {/* Main Grid Layout for Rent and Buy sections side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full md:w-[80%] mx-auto">
        
        {/* Rent Section */}
        <div className="flex flex-col items-center space-y-3">
          {/* Top: Rent Image */}
          <div className="w-full md:h-80 lg:h-96">
            <img
              src="/images/rentImg.webp" // Replace with your desired rent image
              alt="Rent Fashion"
              className="w-full md:h-80 lg:h-96 object-cover rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            />
          </div>

          {/* Bottom: Rent Text Content */}
          <div className="text-center md:text-left space-y-6 w-full">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Rent Fashion at Your Fingertips
            </h1>
            <p className="text-lg sm:text-xl mx-auto text-gray-600">
              Get the latest fashion trends without the commitment. Rent stylish outfits for any occasion.
            </p>

            {/* Rent CTA Button */}
            <Link
              to="/rent" // Link to rent page
              className="inline-block bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold mt-6 transition-all duration-300 hover:bg-blue-400 transform hover:scale-105"
            >
              Rent Now
            </Link>
          </div>
        </div>

        {/* Buy Section */}
        <div className="flex flex-col items-center space-y-6">
          {/* Top: Buy Image */}
          <div className="w-full md:h-80 lg:h-96">
            <img
              src="/images/img10.jpg" // Replace with your desired buy image
              alt="Buy Fashion"
              className="w-full h-full  object-cover rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            />
          </div>

          {/* Bottom: Buy Text Content */}
          <div className="text-center md:text-left space-y-6 w-full">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
              Buy Fashion That Lasts
            </h1>
            <p className="text-lg sm:text-xl mx-auto text-gray-600">
              Own your perfect outfit. Browse and buy high-quality clothing pieces that fit your style.
            </p>

            {/* Buy CTA Button */}
            <Link
              to="/buy" // Link to buy page
              className="inline-block bg-green-500 text-white py-3 px-6 rounded-lg font-semibold mt-6 transition-all duration-300 hover:bg-green-400 transform hover:scale-105"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
