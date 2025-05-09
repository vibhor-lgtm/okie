import React from 'react';
import { FaStar } from 'react-icons/fa';

const FeaturedProduct = () => {
  const products = [
    {
      name: "Men's Casual Shirt",
      image: "/images/img6.jpg", // Replace with your image
      price: "$29.99",
      rating: 4.5,
    },
    {
      name: "Women’s Floral Dress",
      image: "/images/img7.jpg", // Replace with your image
      price: "$49.99",
      rating: 4.8,
    },
    {
      name: "Kids' T-shirt",
      image: "/images/img8.jpg", // Replace with your image
      price: "$19.99",
      rating: 4.2,
    },
    {
      name: "Stylish Sunglasses",
      image: "/images/img9.jpg", // Replace with your image
      price: "$99.99",
      rating: 4.7,
    },
  ];

  return (
    <section className="py-16 px-5 bg-gray-100">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-2"><span className='text-yellow-400'>Featured</span> Products</h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-6">
          Explore our top-rated products, handpicked to suit every style and need. Shop now and elevate your fashion game with these amazing deals!
        </p>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Product Image */}
              <div className="relative w-full h-60">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-6">
                {/* Product Title */}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                      key={index}
                      className={`text-yellow-500 ${index < Math.floor(product.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                  <span className="text-gray-500 ml-2">{product.rating}</span>
                </div>

                {/* Price */}
                <p className="text-xl font-semibold text-gray-800">{product.price}</p>

               
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
