import React from 'react';
import { FaCartPlus } from 'react-icons/fa';

const BestSeller = () => {
  // Example data for best sellers (can be replaced with API data)
  const bestSellers = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is a great product for your needs.',
      price: '$29.99',
      image: "/images/img6.jpg",
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Top quality and durability.',
      price: '$49.99',
      image: "/images/img8.jpg",
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Best seller for every occasion.',
      price: '$39.99',
      image: "/images/img4.jpg",
    },
    {
      id: 4,
      name: 'Product 4',
      description: 'The ultimate solution to your needs.',
      price: '$59.99',
      image: "/images/img7.jpg",
    },
  ];

  return (
    <div className="py-16  px-4 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Best Sellers</h2>
      <p className="text-center text-lg text-gray-600 mb-12">
        Discover the most popular products loved by our customers.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover transform transition-transform duration-300 hover:scale-110"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
              <p className="text-gray-500 mt-2">{product.description}</p>
              <p className="mt-4 text-lg font-bold text-gray-900">{product.price}</p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
