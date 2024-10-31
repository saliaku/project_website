// src/components/Button.js
import React from "react";
import { Link } from "react-router-dom";

function Button({ label, to }) {
  return (
    <Link to={to}>
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        {label}
      </button>
    </Link>
  );
}

export default Button;
