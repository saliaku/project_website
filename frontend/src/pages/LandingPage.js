import React, { useEffect, useRef } from "react";
import "../index.css"; // Import CSS for star effect
import AboutProject from "../components/AboutProject";
import OurVision from "../components/OurVision";
import OurMotivation from "../components/OurMotivation";
import Benefits from "../components/Benefits";
import ForParents from "../components/ForParents";
import OtherWebsites from "../components/OtherWebsites";
import Contact from "../components/Contact";
import Survey from "../components/Survey";
import Purpose from "../components/Purpose";

const LandingPage = () => {
  const starContainerRef = useRef(null);

  useEffect(() => {
    const numStars = 150; // Total stars
    const container = starContainerRef.current;

    if (container && !container.hasChildNodes()) {
      for (let i = 0; i < numStars; i++) {
        const star = document.createElement("div");
        const size = Math.random() * 5 + 1; // Random size between 1px and 4px
        const xPosition = Math.random() * 100; // Random horizontal position (0 to 100%)
        const yPosition = Math.random() * 100; // Random vertical position (0 to 100%)
        const animationDuration = Math.random() * 2 + 0.5; // Random twinkle animation duration (1s to 3s)

        star.classList.add("star");
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${xPosition}%`;
        star.style.top = `${yPosition}%`;
        star.style.animationDuration = `${animationDuration}s`;

        container.appendChild(star);
      }
    }
  }, []);

  const sections = [
    { id: "purpose", component: <Purpose />, align: "left" },
    { id: "about-project", component: <AboutProject />, align: "right" },
    { id: "our-motivation", component: <OurMotivation />, align: "left" },
    { id: "benefits", component: <Benefits />, align: "right" },
    { id: "for-parents", component: <ForParents />, align: "left" },
    { id: "other-websites", component: <OtherWebsites />, align: "right" },
  ];

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden">
      {/* Star background animation */}
      <div ref={starContainerRef} className="absolute inset-0 bg-stars"></div>

      <Survey className="text-center text-white" />

      {/* Main content */}
      <main className="relative z-10 text-center text-white px-6 max-w-8xl">
        <div className="w-full grid grid-cols-12 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              id={section.id}
              className={`col-span-12 ${
                section.align === "right"
                  ? "md:col-start-4 md:col-span-8" // Right-aligned sections
                  : "md:col-start-2 md:col-span-8" // Left-aligned sections
              } transition-transform duration-500 ease-in-out hover:scale-105 mb-8 mt-4`}
            >
              <div className="p-6 bg-white bg-opacity-5 rounded-lg shadow-lg transform hover:translate-y-[-5px] transition-all duration-300">
                {section.component}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
