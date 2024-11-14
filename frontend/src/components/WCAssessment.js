import React, { useState, useEffect } from 'react';
const importAll = (r) => r.keys().map(r);
// Ensure the paths are correct relative to `components` directory
// Ensure paths are correct relative to `components` directory
const rawImages = importAll(require.context('../media/images', false, /\.(jpeg|jpg|png|gif)$/));
// Create visuals array with specific alt names for repeated shapes
const shapes = ['triangle', 'square', 'circle','star'];
const visuals = rawImages.map((src, index) => {
  const imageName = src.split('/').pop();
  // Repeat shapes in sequence: 3 triangles, 3 circles, 3 squares
  const alt =  shapes[ Math.floor(index / 4)];
  console.log(index, alt) ;
  console.log(imageName);
  return {
    id: index + 1,
    type: 'image',
    alt: alt, // Assign alt names correctly
    src,
    name: imageName,
  };
});

// Ensure paths are correct relative to `components` directory
const rawAudio = importAll(require.context('../media/audio', false, /\.(mp3|wav|ogg)$/));

// Create audioClips array with specific alt names for repeated audio types
const vehicles = ['car', 'truck', 'bike', 'cycle'];

const audioClips = rawAudio.map((src, index) => {
  // Repeat audio types in sequence: car, truck, bike, cycle
  const alt = vehicles[Math.floor(index / 4) % vehicles.length]; 
  return {
    id: index + 1,
    type: 'audio',
    alt: alt, // Assign alt names correctly
    src,
  };
});

const words = [
  { id: 1, type: 'word', text: 'Apple', alt: 'Apple' },
  { id: 2, type: 'word', text: 'Banana', alt: 'Banana' },
  { id: 3, type: 'word', text: 'Cherry', alt: 'Cherry' },
  { id: 4, type: 'word', text: 'Kiwi', alt: 'Kiwi'}
  // Add more words as needed
];

const WMCAssessment = ({ updateScoresWMC }) => {
  const [currentTest, setCurrentTest] = useState('image'); // 'image', 'audio', 'text'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [items, setItems] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);


  useEffect(() => {
    // Initialize items and shuffle them after assignment
    let initialItems=[];
    if (currentTest === 'image') {
      initialItems = visuals.map((item) => ({ ...item })); // Copy items to avoid mutation
    } else if (currentTest === 'audio') {
      initialItems = audioClips.map((item) => ({ ...item })); // Copy items to avoid mutation
    } else if (currentTest === 'text') {
      initialItems = words.map((item) => ({ ...item })); // Copy items to avoid mutation
    }
    setItems(initialItems.sort(() => Math.random() - 0.5));
  }, [currentTest]);

  const handleAnswer = (answer) => {
    if (currentIndex >= 2) {
      const isSameAsTwoBack = items[currentIndex]?.alt === items[currentIndex - 2]?.alt;
      if (answer === isSameAsTwoBack) {
        setScore((prev) => prev + 1);
        updateScoresWMC(score + 1);
      }
    }
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Proceed to the next test or end the assessment
      if (currentTest === 'image') {
        setCurrentTest('audio');
      } else if (currentTest === 'audio') {
        setCurrentTest('text');
      } else {
        // alert(`Assessment completed! Your total score: ${score}`);
        setIsCompleted(true); // Mark the test as completed
      }
      setCurrentIndex(0); // Reset index for the next test
    }
  };

  const handleNext = () => {
    if (currentIndex < 2) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">This Section Completed</h1>
        <p className="text-xl mt-4">Go on to next test below</p>
      </div>
    );
  }

  if (items.length === 0) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Working Memory Capacity Assessment</h1>
      <h2 className="text-xl font-semibold mb-4">Current Test: {currentTest.charAt(0).toUpperCase() + currentTest.slice(1)}</h2>
      <p className="mb-2 text-gray-700">Instructions: Observe/Listen to each item as it appears. If you believe the current item is the same as the one shown two items ago, select "Yes". Otherwise, select "No".</p>

      <div className="mb-4">
        {currentTest === 'image' && items[currentIndex]?.type === 'image' && (
          <div>
            <img
              src={items[currentIndex].src}
              alt={items[currentIndex].alt}
               style={{ width: '300px', height: '300px', objectFit: 'cover' }} // Uniform dimensions
              className="mb-2"
              onError={() => console.error('Image failed to load:', items[currentIndex].src)}
            />
            <p className="text-sm text-gray-600">Alt: {items[currentIndex].alt}</p>
          </div>
        )}
        {currentTest === 'audio' && items[currentIndex]?.type === 'audio' && (
          <div>
            <audio controls className="mb-2">
              <source src={items[currentIndex].src} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <p className="text-sm text-gray-600">Alt: {items[currentIndex].alt}</p>
          </div>
        )}
        {currentTest === 'text' && items[currentIndex]?.type === 'word' && (
          <div>
            <p className="text-xl font-semibold">{items[currentIndex].text}</p>
            <p className="text-sm text-gray-600">Alt: {items[currentIndex].alt}</p>
          </div>
        )}
      </div>


      {currentIndex >= 2 && (
        <div>
          <p className="text-lg mb-4">Is this the same content shown 2 items ago?</p>
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

      {currentIndex < 2 && (
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Next
        </button>
      )}

      <p className="mt-4">Current Score: {score}</p>
    </div>
  );
};

export default WMCAssessment;
