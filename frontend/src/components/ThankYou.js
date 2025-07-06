
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();
  const starContainerRef = useRef(null);

  useEffect(() => {
    const numStars = 50;
    const container = starContainerRef.current;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const xPosition = Math.random() * 100;
      const yPosition = Math.random() * 100;
      const animationDuration = Math.random() * 2 + 1;

      star.classList.add('star');
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${xPosition}%`;
      star.style.top = `${yPosition}%`;
      star.style.animationDuration = `${animationDuration}s`;

      container.appendChild(star);
    }
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden min-h-screen flex items-center justify-center text-white">
      <div ref={starContainerRef} className="absolute inset-0 bg-stars overflow-hidden"></div>

      <div className="z-10 p-8 bg-black bg-opacity-30 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Thank You!</h1>
        <p className="text-xl mb-6">Your form has been successfully submitted.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ThankYou;
