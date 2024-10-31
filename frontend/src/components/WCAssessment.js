import React, { useState, useEffect } from 'react';

// Update paths according to your folder structure
const visuals = [
  { id: 1, type: 'image', src: require('../media/images/image1.jpeg').default },
  { id: 2, type: 'image', src: require('../media/images/image2.jpeg').default },
  { id: 3, type: 'image', src: require('../media/images/image3.jpeg').default },
  { id: 4, type: 'image', src: require('../media/images/image4.jpeg').default },
  // Add more visuals as needed
];

const audioClips = [
  { id: 1, type: 'audio', src: require('../media/audio/audio1.mp3').default },
  { id: 2, type: 'audio', src: require('../media/audio/audio2.mp3').default },
  // Add more audio clips as needed
];

const words = [
  { id: 1, type: 'word', text: 'Apple' },
  { id: 2, type: 'word', text: 'Banana' },
  // Add more words as needed
];

const WMCAssessment = () => {
  const n = 2; // Number of items to remember
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Shuffle items and select first few
    const allItems = [...visuals, ...audioClips, ...words];
    const shuffledItems = allItems.sort(() => Math.random() - 0.5).slice(0, 10);
    setItems(shuffledItems);
  }, []);

  const handleAnswer = (answer) => {
    const correctAnswer = items[currentIndex]?.id === items[currentIndex - n]?.id;
    if (answer === correctAnswer) {
      setScore((prev) => prev + 1);
    }
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert(`Game over! Your score: ${score + (answer === correctAnswer ? 1 : 0)}`);
      // Reset for a new round or handle accordingly
    }
  };

  if (items.length === 0) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Working Memory Capacity Assessment</h1>
      
      <div className="mb-4">
        {items[currentIndex]?.type === 'image' && (
          <img 
            src={items[currentIndex].src} 
            alt="visual" 
            className="w-full h-64 object-cover mb-2" 
            onError={() => console.error('Image failed to load:', items[currentIndex].src)}
          />
        )}
        {items[currentIndex]?.type === 'audio' && (
          <audio controls className="mb-2">
            <source src={items[currentIndex].src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        {items[currentIndex]?.type === 'word' && (
          <p className="text-xl font-semibold">{items[currentIndex].text}</p>
        )}
      </div>

      <div className="flex justify-around">
        <button 
          onClick={() => handleAnswer(true)} 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Yes
        </button>
        <button 
          onClick={() => handleAnswer(false)} 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
        >
          No
        </button>
      </div>

      <p className="mt-4">Current Score: {score}</p>
    </div>
  );
};

export default WMCAssessment;
