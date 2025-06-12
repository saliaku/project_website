// src/components/Survey.js
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Survey = () => (
  <section className="my-8 text-center text-white py-10">
    <p className="text-lg mb-4">
      Jump right onto the Assessment...
    </p>
    <Link to="/survey">
      <button className="px-20 py-5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 focus:outline-none text-2xl font-bold">
        Take Test
      </button>
    </Link>
  </section>
);

export default Survey;

