import React from "react";

const ShopByCategories = () => {
  const categories = [
    {
      name: "Men's Clothing",
      image: "/images/img2.jpeg",
      description:
        "Explore the latest in men's fashion, from casual to formal.",
    },
    {
      name: "Women's Clothing",
      image: "/images/img3.jpeg",
      description: "Find elegant and trendy clothing for every occasion.",
    },
    {
      name: "Kids' Clothing",
      image: "/images/img4.jpg",
      description: "Dress up your little ones with fun and stylish outfits.",
    },
    {
      name: "Accessories",
      image: "/images/img5.jpg",
      description: "Accessorize your look with bags, shoes, and more.",
    },
  ];

  return (
    <section className="py-16 px-5 bg-gray-100">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Shop by <span className="text-yellow-400">Categories</span>
        </h2>

        {/* Paragraph */}
        <p className="text-lg text-gray-600 mb-12">
          Explore a wide range of categories, from the latest trends in fashion
          to timeless classics. Find what suits your style and shop now!
        </p>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative w-full h-48 mb-6">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Category Name */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {category.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategories;
