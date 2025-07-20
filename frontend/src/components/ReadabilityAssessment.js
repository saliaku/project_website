import React, { useState ,useEffect,useRef} from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const ReadabilityAssessment = () => {

   const location = useLocation();  // ✅ correct position
   const navigate = useNavigate();

    const incomingFormData = location.state || {};
    
    const [formData, setFormData] = useState({
            ...incomingFormData, // include data from previous pages
    })
  // const aIssue = formData.auditoryIssue?.toLowerCase() === "yes"; // boolean
  const vIssue = formData.visualIssue?.toLowerCase(); // "none", "partial", "full"
  const quadrant = formData?.cviScore?.finalQuadrantCode ?? 10;
  // console.log('readability quad is',quadrant);

  const [text, setText] = useState('');
  const [score, setScore] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

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


  const calculateReadability = (text) => {
    const words = text.split(/\s+/).filter(word => word.length > 0).length;
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    const syllables = text.split(/\s+/).reduce((count, word) => count + countSyllables(word), 0);

    // Handle edge cases: prevent division by zero
    if (words === 0 || sentences === 0) return 0;

    // Flesch Reading Ease formula
    const fleschScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    return Math.max(0, Math.min(100, Math.round(fleschScore))); // Limit score between 0 and 100
  };

   const countSyllables = (word) => {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    const syllablePattern = /[aeiouy]+/g;
    const matches = word.match(syllablePattern) || [];
    
    // Adjust syllable count for specific cases, e.g., silent 'e'
    let syllables = matches.length;
    if (word.endsWith("e") && syllables > 1) syllables -= 1; // Silent 'e' at end of word
    return syllables;
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (isCompleted) return; //  Prevent duplicate submit

    if (text.trim() === '') {
      alert('Please write something before submitting.');
      return;
    }
    const readabilityScore = calculateReadability(text);
    setScore(readabilityScore);

    const updatedFormData = {
    ...formData,
    fleschScore: readabilityScore,
  };

    setFormData(updatedFormData); // update local state too
    setIsCompleted(true); // Set the completion state

  };

useEffect(() => {
  if (isCompleted) {
    console.log("✅ readability completed. Final formData:", formData);
  }
}, [isCompleted, formData]);

const hasInitializedRef = useRef(false);

useEffect(() => {
  if (vIssue === "full" && !hasInitializedRef.current) {
    hasInitializedRef.current = true;
    
    setFormData(prev => ({ ...prev, fleschScore: 0 }));
    setIsCompleted(true);
    // updateScores(0);
    // markReadabilityComplete();
  }
}, [vIssue]);

 const starContainerRef = useRef(null);
  
    useEffect(() => {
      const numStars = 50;
      const container = starContainerRef.current;

      if (!container) return; // 🔒 Safeguard
  
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


  if (vIssue === "full") {
    return (
     <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden min-h-screen pb-0 mb-0">
      <div ref={starContainerRef} className="absolute inset-0 bg-stars overflow-hidden"></div>
   <div className={`absolute ${getQuadrantStyle(quadrant)} p-6 bg-white rounded-lg overflow-auto resize shadow-lg`}
   style={{
    // minWidth: '33vw',
    // minHeight: '40vh',
    maxWidth: '90vw',
    maxHeight: '80vh',
    // width: '33vw',
    // height: '36vh',
    // boxSizing: 'border-box',
  }}
  >
        <h1 className="text-2xl font-bold">No Applicable Tests</h1>
        <p className="text-xl mt-4">You may skip this section.</p>
        <button
    onClick={() => navigate('/ip_test', { state: formData })}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
  >
    Next Page
  </button>

      </div>
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
       onClick={() => navigate('/ip_test', { state: formData })}
       className="mt-6 bg-blue-700 hover:bg-green-800 text-white font-semibold py-4 px-6 rounded shadow transition duration-200"
      >
        Next Page
      </button>
      </div>
       </div>
        </div>
    );
  }


  return (
     <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden min-h-screen pb-0 mb-0">
      <div ref={starContainerRef} className="absolute inset-0 bg-stars overflow-hidden"></div>

  <div className={`absolute ${getQuadrantStyle(quadrant)} p-6 bg-white rounded-lg overflow-auto resize shadow-lg`}
   style={{
    // minWidth: '33vw',
    // minHeight: '40vh',
    maxWidth: '90vw',
    maxHeight: '80vh',
    // width: '33vw',
    // height: '36vh',
    boxSizing: 'border-box',
  }}
  >
    <h1 className="text-2xl font-bold mb-4">Readability Assessment</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="8"
        className="w-full p-2 border rounded-lg shadow"
        placeholder="Write about your favourite place/show etc in about 4-5 sentences."
      ></textarea>
      
  {/* Submit button to calculate the readability score */}
  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
  >
    Next Page
  </button>

    </form>
  </div>
</div>

  );
};

export default ReadabilityAssessment;
