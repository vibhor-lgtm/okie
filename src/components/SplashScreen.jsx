import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false); // Splash screen ko 3 seconds ke baad hide karo
    }, 3000); // Splash screen 3 seconds ke baad disappear hoga

    return () => clearTimeout(timer); // Clean up timer
  }, []);

  if (!showSplash) {
    return null; // Splash screen ko hide karo jab time khatam ho jaye
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff7a7a] to-[#f9a825] text-5xl md:text-7xl font-bold tracking-wide animate-gradient-text text-shadow">
        OKIE
      </span>
    </div>
  );
};

export default SplashScreen;
