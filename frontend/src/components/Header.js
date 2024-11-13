// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-violet-900 text-white py-6 shadow-md z-10">
      {/* Background stars effect */}
      <div className="absolute inset-0 bg-stars opacity-30"></div>

      <div className="container mx-auto px-4 relative z-20 flex items-right justify-between">
      <Link to="/">
      <div className="text-2xl font-bold hover:text-blue-300 transition-colors duration-1000 hover:text-purple-600">
  Data collection Assessment
</div>
      </Link>

        {/* Navigation links */}
        <nav className="hidden lg:flex space-x-4  text-small text-right">
        <button onClick={() => scrollToSection("purpose")} className="hover:text-blue-300 transition">
            Purpose
          </button>
          <button onClick={() => scrollToSection("about-project")} className="hover:text-blue-300 transition">
            About
          </button>
          <button onClick={() => scrollToSection("our-motivation")} className="hover:text-blue-300 transition">
            Motivation
          </button>
          <button onClick={() => scrollToSection("benefits")} className="hover:text-blue-300 transition">
            Benefits
          </button>
          <button onClick={() => scrollToSection("for-parents")} className="hover:text-blue-300 transition">
            For Parents
          </button>
          <button onClick={() => scrollToSection("other-websites")} className="hover:text-blue-300 transition">
            Resources
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
