import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const colorOptions = ['black', 'pink'];
const matching = colorOptions[0];
const different = colorOptions[1];

// The matching color is pink
// The different (odd) color is black

const CviTest = () => {
  // Generate a set of cards with black ones placed at random positions
  // total = 45 cards
  // 8 black cards
  const [cards, setCards] = useState([]);

  const [selected, setSelected] = useState([]);

  const [oddCardIndices, setOddCardIndices] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!location.state) {
      console.error("No state passed to CviTest.");
      // navigate('/three_tests'); // fallback
    }

    if (cards.length === 0) {
      const newCards = [];

      // number of black cards
      const numberOfCards = 45;

      // positions for black cards
      const blackIndices = [0, 8, 13, 20, 24, 31, 36, 44];
      setOddCardIndices(blackIndices);

      for (let i = 0; i < numberOfCards; i++) {
        if (blackIndices.includes(i)) {
          newCards.push({ color: different, isOdd: true });
        } else {
          newCards.push({ color: matching, isOdd: false });
        }
      }

      setCards(newCards);
    }
  }, [cards.length]);


  const findRegion = (correctBlackSelections, numCols = 9) => {
  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;

  correctBlackSelections.forEach((idx) => {
    const row = Math.floor(idx / numCols);
    const col = idx % numCols;

    if (col < numCols / 2) left++;
    else right++;

    if (row < Math.floor((45) / 2 / numCols)) top++;
    else bottom++;
  });

  if (left > right && top > bottom) return "Top Left";
  if (left > right && bottom > top) return "Bottom Left";
  if (right > left && top > bottom) return "Top Right";
  if (right > left && bottom > top) return "Bottom Right";

  if (left > right && top == bottom) return "Left";
  if (right > left && top == bottom) return "Right";

  if (top > bottom && left == right) return "Top";
  if (top < bottom && left == right) return "Bottom";

  return "Bottom";
};




  const handleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  const handleSubmit = () => {
    let correct = 0;

    selected.forEach((selectedIdx) => {
      if (oddCardIndices.includes(selectedIdx)) correct++;
    });

     const correctBlackSelections = selected.filter((selectedIdx) =>
      oddCardIndices.includes(selectedIdx)
    );



    let maxIdx = null;
    let minIdx = null;

    if (correctBlackSelections.length > 0) {
      maxIdx = Math.max(...correctBlackSelections);
      minIdx = Math.min(...correctBlackSelections);
      console.log("Max black card index (for backend):", maxIdx);
      console.log("Min black card index (for backend):", minIdx);
      // alert(`${maxIdx}, ${minIdx}`)
    } else {
      alert("No black cards were correctly identified.");
    }
// Determine visible region
    const visibleRegion = findRegion(correctBlackSelections);
    alert(`${visibleRegion}`);
    // Prepare data to send to backend
    const cvi_submission = {
      score: correct,
      total: oddCardIndices.length,
      maxIdx,
      minIdx,
      visibleRegion,
    };
    
    console.log("Submitting to backend.", cvi_submission);
    //  navigate('/three_tests'); 
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-auto min-h-screen p-6">
      <div className="max-w-7xl mx-auto p-6 relative z-10 bg-black bg-opacity-20 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-50">Find the Odd One Out</h2>
        <p className="text-gray-50 mb-4">
          Please select all the ODD cards you think are different from the rest.
          Please scroll down to submit this test and move on to the next page.
        </p>  
      </div>

      {/* Grid of cards */}
      <div className="flex-grow px-4 py-2">
        {/* Grid with 5 columns — row heights will grow naturally based on their content */}
        <div className="grid grid-cols-9 gap-4">
          {cards.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`rounded-md border-4 ${
                selected.includes(idx) ? "border-pink-500" : "border-gray-500"
              }`}
              style={{ backgroundColor: item.color, cursor:'pointer', height:'100px' }}>
            </div>
          ))}
        </div>

        {/* Submit Button directly after grid */}
        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="bg-blue-500 hover:bg-blue-600 text-gray-50 py-4 px-20 rounded text-2xl font-semibold">
            Submit
          </button>
        </div>
      </div>

    </div>
  );
};

export default CviTest;
