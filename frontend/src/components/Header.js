// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="relative bg-gradient-to-br from-indigo-900 via-blue-700 to-violet-800 text-white py-6 shadow-md z-10">
      {/* Background stars effect */}
      <div className="absolute inset-0 bg-stars opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold">
          Final Year Project Website
        </Link>
        {/* Placeholder for additional links or buttons if needed */}
      </div>
    </header>
  );
}

export default Header;
