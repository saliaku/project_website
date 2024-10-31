// src/components/Header.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4">
      <Link to="/"> {/* Make the h1 clickable */}
        <h1 className="text-xl cursor-pointer">Final year project website</h1>
      </Link>
    </header>
  );
}

export default Header;
