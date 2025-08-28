import React, { useEffect, useRef } from "react";
import logo from "../media/images/nitc-logo.svg"; // Import logo
import "../index.css"; // Import Tailwind CSS and custom CSS

const LoadingScreen = ({ setLoadingComplete }) => {
  const starContainerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingComplete(true), 3000);
    return () => clearTimeout(timer);
  }, [setLoadingComplete]);

  useEffect(() => {
    const numStars = 50;
    const container = starContainerRef.current;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      const size = Math.random() * 3 + 1;
      const xPosition = Math.random() * 100;
      const yPosition = Math.random() * 100;
      const animationDuration = Math.random() * 2 + 1;

      star.classList.add("star");
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${xPosition}%`;
      star.style.top = `${yPosition}%`;
      star.style.animationDuration = `${animationDuration}s`;

      container.appendChild(star);
    }
  }, []);

  const handleClick = () => setLoadingComplete(true);

  return (
    <div
      className="relative w-full h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden flex items-center justify-center"
      onClick={handleClick}
    >
      <img src={logo} alt="Logo" className="absolute top-2 left-5 w-65 h-60" />

      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-3xl">
          ML-Enabled E-learning Framework
        </h1>
        <div className="text-white mt-4">
          <span className="typing-effect"></span>
        </div>
      </div>

      <div ref={starContainerRef} className="absolute inset-0 bg-stars"></div>

      <div className="absolute bottom-5 right-5 p-4 text-white text-lg font-semibold">
        <p>Kailas Nath</p>
        <p>Sreeshma Sangesh</p>
        <p>Serena Anthony</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
