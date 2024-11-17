import React, { useState, useEffect } from 'react';
const importAll = (r) => r.keys().map(r);

// Import images and audio files
const rawImages = importAll(require.context('../media/images', false, /\.(jpeg|jpg|png|gif)$/));
const rawAudio = importAll(require.context('../media/audio', false, /\.(mp4|wav|ogg)$/));

// Image and audio mapping logic
const imageMapping = [
  { range: [1, 3], alt: 'triangle' },
  { range: [4, 6], alt: 'square' },
  { range: [7, 9], alt: 'circle' }
];

const audioMapping = [
  { range: [1, 3], alt: 'cycle' },
  { range: [4, 6], alt: 'car' },
  { range: [7, 9], alt: 'bike' },
];

// Function to get the correct alt text based on index and mapping
const getAltText = (index, mapping) => {
  for (let map of mapping) {
    if (index + 1 >= map.range[0] && index + 1 <= map.range[1]) {
      return map.alt;
    }
  }
  return 'unknown';
};

// Map images with correct alt texts and log for verification
const visuals = rawImages.map((src, index) => {
  const alt = getAltText(index, imageMapping);
  return {
    id: index + 1,
    type: 'image',
    alt,
    src,
  };
});

// Map audio clips with correct alt texts and log for verification
const audioClips = rawAudio.map((src, index) => {
  const alt = getAltText(index, audioMapping);
  return {
    id: index + 1,
    type: 'audio',
    alt,
    src,
  };
});

const words = [
  { id: 1, type: 'word', text: 'Apple', alt: 'Apple' },
  { id: 2, type: 'word', text: 'Banana', alt: 'Banana' },
  { id: 3, type: 'word', text: 'Cherry', alt: 'Cherry' },
  { id: 4, type: 'word', text: 'Kiwi', alt: 'Kiwi'},

  { id: 5, type: 'word', text: 'APPLE', alt: 'Apple' },
  { id: 6, type: 'word', text: 'BANANA', alt: 'Banana' },
  { id: 7, type: 'word', text: 'CHERRY', alt: 'Cherry' },
  { id: 8, type: 'word', text: 'KIWI', alt: 'Kiwi'},

  { id: 9, type: 'word', text: 'apple', alt: 'Apple' },
  { id: 10, type: 'word', text: 'banana', alt: 'Banana' },
  { id: 11, type: 'word', text: 'cherry', alt: 'Cherry' },
  { id: 12, type: 'word', text: 'kiwi', alt: 'Kiwi'},

  { id: 13, type: 'word', text: 'aPpLe', alt: 'Apple' },
  { id: 14, type: 'word', text: 'BaNaNa', alt: 'Banana' },
  { id: 15, type: 'word', text: 'cHeRrY', alt: 'Cherry' },
  { id: 16, type: 'word', text: 'KiwI', alt: 'Kiwi'},
  // Add more words as needed
];

// Function to shuffle an array
const shuffleArray = (array, limit = 7) => {
  return array.sort(() => Math.random() - 0.5).slice(0, limit);
};

const WMCAssessment = ({ updateScoresWMC }) => {
  const [currentTest, setCurrentTest] = useState('image'); // 'image', 'audio', 'text'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sectionScore, setSectionScore] = useState({ image: 0, audio: 0, text: 0 });
  const [items, setItems] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
   // Initialize items based on the current test type and shuffle them
   let initialItems = [];
   switch (currentTest) {
     case 'image':
       initialItems =shuffleArray([...visuals]);
       break;
     case 'audio':
       initialItems = shuffleArray([...audioClips]);
       break;
     case 'text':
       initialItems = shuffleArray([...words]);
       break;
     default:
       initialItems = [];
   }
   if (initialItems.length > 0) {
    setItems(initialItems);
  } else {
    console.warn(`No items found for the ${currentTest} test.`);
  }
 }, [currentTest]);

  const handleAnswer = (answer) => {
    if (currentIndex >= 2) {
      const isSameAsTwoBack = items[currentIndex]?.alt === items[currentIndex - 2]?.alt;
      if (answer === isSameAsTwoBack) {
        setScore((prev) => prev + 1);
        setSectionScore((prevScores) => ({
          ...prevScores,
          [currentTest]: prevScores[currentTest] + 1,
        }));
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
        <p className="text-xl mt-4">Your final scores:</p>
        <p>Image section: {sectionScore.image} / 5</p>
        <p>Audio section: {sectionScore.audio} / 5</p>
        <p>Text section: {sectionScore.text} / 5</p>
        <p>Total score: {sectionScore.image + sectionScore.audio + sectionScore.text} / 15</p>
      </div>
    );
  }

  // if (items.length === 0) return <p>Loading...</p>;

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
