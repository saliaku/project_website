// src/components/Footer.js
import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900  to-purple-900  text-white p-4 mt-0 relative z-10">
      {/* Background stars effect */}
      <div className="absolute inset-0 bg-stars opacity-30"></div>
      <p className="text-center z-20 relative">
        Sreeshma Sangesh ~~  Serena Anthony ~~ H Kailas Nath
      </p>
    </footer>
  );
}

export default Footer;
