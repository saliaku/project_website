import React, { useState, useEffect,useRef } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios if you're using it
import {calculateVATScores} from '../components/vat_calc';

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

// Map images with correct alt texts
const visuals = rawImages.map((src, index) => {
  const alt = getAltText(index, imageMapping);
  return {
    id: index + 1,
    type: 'image',
    alt,
    src,
  };
});

// Map audio clips with correct alt texts
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
  { id: 4, type: 'word', text: 'Kiwi', alt: 'Kiwi' },
  { id: 5, type: 'word', text: 'APPLE', alt: 'Apple' },
  { id: 6, type: 'word', text: 'BANANA', alt: 'Banana' },
  { id: 7, type: 'word', text: 'CHERRY', alt: 'Cherry' },
  { id: 8, type: 'word', text: 'KIWI', alt: 'Kiwi' },
  { id: 9, type: 'word', text: 'apple', alt: 'Apple' },
  { id: 10, type: 'word', text: 'banana', alt: 'Banana' },
  { id: 11, type: 'word', text: 'cherry', alt: 'Cherry' },
  { id: 12, type: 'word', text: 'kiwi', alt: 'Kiwi' },
];

// Function to shuffle an array and limit the number of items
const shuffleArray = (array, limit = 7) => {
  return array.sort(() => Math.random() - 0.5).slice(0, limit);
};

const WMCAssessment = () => {

  const location = useLocation();  // ✅ correct position
  const navigate = useNavigate(); // ✅ define navigate

  const incomingFormData = location.state || {};

   const [formData, setFormData] = useState({
            ...incomingFormData, // include data from previous pages
    })

  const aIssue = formData.auditoryIssue?.toLowerCase() === "yes"; // boolean
  const vIssue = formData.visualIssue?.toLowerCase(); // "none", "partial", "full"
  const quadrant = formData?.cviScore?.finalQuadrantCode ?? 10;

  const getQuadrantStyle = (code) => {
  switch (code) {
    case 1: return 'top-0 left-1/2 -translate-x-1/2';         // Top center
    case 2: return 'bottom-0 left-1/2 -translate-x-1/2';      // Bottom center
    case 3: return 'top-1/2 left-0 -translate-y-1/2';         // Center left
    case 4: return 'top-1/2 right-0 -translate-y-1/2';        // Center right
    case 5: return 'top-0 left-0';                            // Top left
    case 6: return 'top-0 right-0';                           // Top right
    case 7: return 'bottom-0 left-0';                         // Bottom left
    case 8: return 'bottom-0 right-0';                        // Bottom right
    case 9: return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'; // Center
    case 10: return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh]';                                // Full screen
    default: return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '; // Default center
  }
};

   // Determine test order
   const getTestOrder = () => {
    if (vIssue === "full" && aIssue) return []; // No tests possible
    if (vIssue === "full") return ['audio'];
    if (aIssue) return ['image', 'text'];
    return ['image', 'audio', 'text'];
  };
  const [testOrder, setTestOrder] = useState(getTestOrder());
  const [testIndex, setTestIndex] = useState(0);
  const [currentTest, setCurrentTest] = useState(getTestOrder()[0]);
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
        initialItems = shuffleArray([...visuals], 7);
        break;
      case 'audio':
        initialItems = shuffleArray([...audioClips], 7);
        break;
      case 'text':
        initialItems = shuffleArray([...words], 7);
        break;
      default:
        initialItems = [];
    }
    setItems(initialItems);
  }, [currentTest]);

  const handleAnswer = (answer) => {
    if (currentIndex >= 2) {
      const isSameAsTwoBack = items[currentIndex]?.alt === items[currentIndex - 2]?.alt;
      if (answer === isSameAsTwoBack) {
        setScore((prev) => prev + 1);
        setSectionScore((prevScores) => {
          const updatedScores = {
            ...prevScores,
            [currentTest]: prevScores[currentTest] + 1,
          };
          return updatedScores;
        });
      }
    }
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // // Proceed to the next test or end the assessment
      // if (currentTest === 'image') {
      //    if (aIssue) {
      //     setCurrentTest('text'); // skip audio if auditory impaired
      //   } else {
      //     setCurrentTest('audio');
      //   }
      // } else if (currentTest === 'audio') {
      //   setCurrentTest('text');
      // }  else if (currentTest === 'text')  {
      //   setIsCompleted(true); // Mark the test as completed
      // }

       const nextIndex = testIndex + 1;
      if (nextIndex < testOrder.length) {
        setCurrentTest(testOrder[nextIndex]);
        setTestIndex(nextIndex);
        setCurrentIndex(0);
      } else {
        setIsCompleted(true);
      }
      // setCurrentIndex(0); // Reset index for the next test
    }
  };

  useEffect(() => {
  if (isCompleted) {
    const wmcScore= {
        image: sectionScore.image,
        audio: sectionScore.audio,
        text: sectionScore.text,
      }

    const ipScore = formData.ipScore;
    const vat = calculateVATScores(wmcScore, ipScore);

    const updatedFormData = {
      ...formData,
      wmcScore: wmcScore,
      vatScore: vat,
    };

    setFormData(updatedFormData);
    console.log("✅ wmc completed. Final formData with vat scores:", updatedFormData);
  }
}, [isCompleted]);

  

const hasInitializedRef = useRef(false);

  useEffect(() => {
  if (testOrder.length === 0 && !hasInitializedRef.current) {
    hasInitializedRef.current = true;
    // updateScoresWMC({ image: 0, audio: 0, text: 0 }); // Optional: reflect skipped
    setIsCompleted(true);
  }
}, [testOrder]);



    const sendFormDataToBackend = async () => {
           
    // navigate('/thankyou');
    
    try {

        // Log the data being sent
        console.log('Sending form data to backend:', formData);

        const response = await axios.post(
            'https://68.233.115.209/api/formdata',
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                // Add better error handling
                validateStatus: function (status) {
                    return status >= 200 && status < 500;
                }
            }
        );

        console.log('Response from backend:', response.data);
        
        if (response.status === 201 || response.status === 200) {
            alert('Form data sent successfully!');
            navigate('/thankyou');
        } else {
            throw new Error(`Server responded with status ${response.status}`);
        }
    } catch (error) {
        console.error('Error details:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        
        let errorMessage = 'Failed to send form data. ';
        if (error.response) {
            errorMessage += `Server responded with: ${error.response.data?.message || error.response.status}`;
        } else if (error.request) {
            errorMessage += 'No response received from server.';
        } else {
            errorMessage += error.message;
        }
        
        alert(errorMessage);
    }
};



 const starContainerRef = useRef(null);
  
    useEffect(() => {
      const numStars = 50;
      const container = starContainerRef.current;
      if (!container) return;
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


   if (testOrder.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">No Applicable Tests</h1>
        <p className="text-xl mt-4">You may skip this section.</p>
         <button
        onClick={() => navigate('/thankyou', { state: formData })}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Submit
      </button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden min-h-screen pb-0 mb-0">
      <div ref={starContainerRef} className="absolute inset-0 bg-stars overflow-hidden"></div>
  <div className={`absolute ${getQuadrantStyle(quadrant)} p-6 bg-white rounded-lg shadow-lg resize overflow-auto justify-center text-center`}
   style={{
    // minWidth: '33vw',
    // minHeight: '40vh',
    maxWidth: '90vw',
    maxHeight: '80vh',
    width: '33vw',
    height: '36vh',
    boxSizing: 'border-box',
  }}
  >
            <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-6 text-center overflow-auto">

         <h1 className="text-2xl font-bold">This Section Completed</h1>
       <button
       onClick={sendFormDataToBackend}
       className="mt-6 bg-blue-700 hover:bg-green-800 text-white font-semibold py-4 px-6 rounded shadow transition duration-200"
      >
        Submit
      </button>
      </div>
       </div>
        </div>
    );
  }

  return (
     <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden min-h-screen pb-0 mb-0">
      <div ref={starContainerRef} className="absolute inset-0 bg-stars overflow-hidden"></div>
      <div className={`absolute ${getQuadrantStyle(quadrant)} p-6 bg-white rounded-lg resize shadow-lg overflow-auto`}
      style={{
        // minWidth: '33vw',
        // minHeight: '40vh',
        maxWidth: '90vw',
        maxHeight: '80vh',
        width: '33vw',
        // height: '36vh',
        boxSizing: 'border-box',
      }}
      >

      <h1 className="text-2xl font-bold mb-4">Working Memory Capacity Assessment</h1>
      <h2 className="text-xl font-semibold mb-4">
        Current Test: {currentTest.charAt(0).toUpperCase() + currentTest.slice(1)}
      </h2>

      {/* Dynamic Instructions */}
      <p className="mb-2 text-gray-700">
        {currentTest === 'image' && 
          'Observe each image carefully. If you believe the current shape is the same as the one shown two items ago, select "Yes". Otherwise, select "No". You may IGNORE the colour of the shape.'}
        {currentTest === 'audio' && 
          'Listen to each audio clip attentively. If you think the current vehicle matches the one played two items ago, select "Yes". Otherwise, select "No". You may IGNORE the voice. The audio clip can be played multiple times.'}
        {currentTest === 'text' && 
          'Read each word displayed on the screen. If the current fruit matches the one displayed two items ago, select "Yes". Otherwise, select "No". You may IGNORE the casing of the words.'}
      </p>

      {/* Current Test Content */}
      <div className="mb-4">
        {currentTest === 'image' && items[currentIndex]?.type === 'image' && (
          <img
            src={items[currentIndex].src}
            alt={items[currentIndex].alt}
            style={{ width: '300px', height: '300px', objectFit: 'cover' }}
            className="mb-2"
          />
        )}
        {currentTest === 'audio' && items[currentIndex]?.type === 'audio' && (
          <audio
            key={items[currentIndex].id}
            controls
            className="mb-2"
          >
            <source src={items[currentIndex].src} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        )}
        {currentTest === 'text' && items[currentIndex]?.type === 'word' && (
          <p className="text-xl font-semibold">{items[currentIndex].text}</p>
        )}
      </div>

      {/* Answer Section */}
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
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Next
        </button>
      )}


    </div>
    </div>
  );
  
};

export default WMCAssessment;
