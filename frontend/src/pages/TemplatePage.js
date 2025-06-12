// src/components/__template.js
import React, { useEffect, useRef } from "react";
import "../index.css"; // Import CSS for star effect

const __template = () => {
  const starContainerRef = useRef(null);

  useEffect(() => {
    const numStars = 50; // Total stars
    const container = starContainerRef.current;

    // Create stars if they don't exist
    if (container && !container.hasChildNodes()) {
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
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden flex flex-col items-center justify-center">
      {/* Star background animation */}
      <div ref={starContainerRef} className="absolute inset-0 bg-stars"></div>

      

      {/* Main content */}
      <main className="relative z-10 text-center text-white px-6">
        

        
      </main>

      
    </div>
  );
};

export default __template;
