import React, { useState, useEffect } from 'react';
// Dynamically import all images from the media folder
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('../media/images', false, /\.(jpeg|jpg|png|gif)$/));
// Import all audio files from the audio folder
const audioFiles = importAll(require.context('../media/audio', false, /\.(mp3|wav|ogg)$/));

// Create visuals array using dynamically imported images
const visuals = images.map((src, index) => ({
  id: index + 1,
  type: 'image',
  alt: `img${index + 1}`,
  src,
}));

const audioClips = audioFiles.map((src, index) => ({
  id: index + 1,
  type: 'audio',
  alt: `audio${index + 1}`,
  src,
}));

const words = [
  { id: 1, type: 'word', text: 'Apple' },
  { id: 2, type: 'word', text: 'Banana' },
  // Add more words as needed
];

const WMCAssessment = ({updateScoresWMC}) => {
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
    if (currentIndex >=2){
      if (answer === correctAnswer) {
        setScore((prev) => prev + 1);
        updateScoresWMC(score + 1);
      }
    }
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      alert(`Game over! Your score: ${ score + (answer === correctAnswer ? 1 : 0)}`);
      // Reset for a new round or handle accordingly
    }
  };

  const handleNext = () => {
    if (currentIndex < 2) {
      setCurrentIndex((prev) => prev + 1);
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

      {currentIndex < 2 ? (
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Next
        </button>
      ) :(
        <div>
          <p className="text-lg mb-4">Is this the same object shown 2 images ago?</p>  

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
      
        </div>
      )}

      <p className="mt-4">Current Score: {score}</p>
    </div>
    
  );
};

export default WMCAssessment;
