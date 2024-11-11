import React, { useEffect, useRef } from "react";
import logo from "../media/images/nitc-logo.svg"; // Import logo
import "../index.css"; // Import Tailwind CSS

const LoadingScreen = ({ setLoadingComplete }) => {
  const starContainerRef = useRef(null);

  useEffect(() => {
    // Set a timeout for demonstration; adjust as necessary
    const timer = setTimeout(() => setLoadingComplete(true), 3000);
    return () => clearTimeout(timer);
  }, [setLoadingComplete]);

  useEffect(() => {
    const numStars = 50; // Total stars
    const container = starContainerRef.current;

    // Create 50 stars
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 3 + 1; // Random size between 1px and 4px
      const xPosition = Math.random() * 100; // Random horizontal position (0 to 100%)
      const yPosition = Math.random() * 100; // Random vertical position (0 to 100%)
      const animationDuration = Math.random() * 2 + 1; // Random twinkle animation duration (1s to 3s)

      // Set star properties
      star.classList.add("star");
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${xPosition}%`;
      star.style.top = `${yPosition}%`;
      star.style.animationDuration = `${animationDuration}s`;

      // Append the star to the container
      container.appendChild(star);
    }
  }, []);

  const handleClick = () => {
    // Complete the loading when clicked
    setLoadingComplete(true);
  };

  return (
    <div
      className="relative w-full h-screen bg-gradient-to-br from-indigo-900 via-blue-700 to-violet-800 overflow-hidden flex items-center justify-center"
      onClick={handleClick} // Add click handler to make the loading complete
    >
      {/* Top-left image */}
      <img
        src={logo}
        alt="Logo"
        className="absolute top-2 left-5 w-65 h-60" // Increased size of the logo
      />

      {/* Title in the center */}
      <h1 className="text-6xl font-extrabold text-white text-center drop-shadow-3xl">
        ML-Enabled E-learning Framework
      </h1>

      {/* Background animation for stars */}
      <div
        ref={starContainerRef}
        className="absolute inset-0 bg-stars"
      ></div>

      {/* Bottom-right corner names */}
      <div className="absolute bottom-5 right-5 p-4 text-white text-lg font-semibold">
        <p>Kailas B210518CS</p>
        <p>Sreeshma B210035CS</p>
        <p>Serena B210017CS</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
