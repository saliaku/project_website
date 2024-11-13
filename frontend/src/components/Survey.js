// src/components/Survey.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Survey = () => (
  <section className="my-8 text-center">
    <p className="text-lg mb-4">
      Jump right onto the Assessment
    </p>
    <Link to="/survey">
      <button className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">
        Jump 
      </button>
    </Link>
  </section>
);

export default Survey;

