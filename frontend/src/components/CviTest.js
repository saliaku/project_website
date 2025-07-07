import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const colorOptions = ['black', 'pink'];
const matching = colorOptions[0];
const different = colorOptions[1];

// 1: top
// 2: bottom 
// 3: left
// 4: right

// 5: topLeft
// 6: topRight
// 7: bottomLeft
// 8: bottomRight

// 9: center
// 10: All

// The matching color is black
// The odd (target) tiles are pink

const CviTest = () => {
  const [cards, setCards] = useState([]);
  const [selected, setSelected] = useState([]);
  const [oddCardIndices, setOddCardIndices] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const incomingFormData = location.state || {};
const [formData, setFormData] = useState({
            ...incomingFormData});

  useEffect(() => {
    // if (!location.state) {
    //   console.error("No state passed to CviTest.");
    //   // navigate('/three_tests'); // fallback
    // }

    if (cards.length === 0) {
      const newCards = [];
      const numberOfCards = 60;

      // Indices for odd (target) tiles
      const oddIndices = [0, 9, 12, 17, 24, 25, 34, 35, 42, 47, 50, 59];
      setOddCardIndices(oddIndices);

      for (let i = 0; i < numberOfCards; i++) {
        if (oddIndices.includes(i)) {
          newCards.push({ color: different, isOdd: true });
        } else {
          newCards.push({ color: matching, isOdd: false });
        }
      }

      setCards(newCards);
    }
  }, [location.state, cards.length]);

  const handleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };


const handleSubmit = () => {
  let correct = 0;

  const totalClicked = selected.length;
  if (totalClicked === 0) {
    alert(`Nothing is clicked! Please select at least one tile.`);
    return;
  }

  selected.forEach((selectedIdx) => {
    if (oddCardIndices.includes(selectedIdx)) correct++;
  });

  const correctOddSelections = selected.filter((selectedIdx) =>
    oddCardIndices.includes(selectedIdx)
  );

  const wrongSelections = selected.filter((index) => 
    !oddCardIndices.includes(index)
  );
  const wrongClicked = wrongSelections.length;

  const quadrantClicks = {
    topLeft: 0,
    topRight: 0,
    bottomLeft: 0,
    bottomRight: 0,
    center: 0,
  };

  const numCols = 10;
  const numRows = 6;

  selected.forEach((index) => {
    const row = Math.floor(index / numCols);
    const col = index % numCols;

    if (row < numRows / 2 && col < numCols / 2) quadrantClicks.topLeft++;
    else if (row < numRows / 2 && col >= numCols / 2) quadrantClicks.topRight++;
    else if (row >= numRows / 2 && col < numCols / 2) quadrantClicks.bottomLeft++;
    else if (row >= numRows / 2 && col >= numCols / 2) quadrantClicks.bottomRight++;

    if (row >= 1 && row <= 5 && col >= 2 && col <= 6) {
      quadrantClicks.center++;
    }
  });

  // Determine final quadrant code
  const regionCodes = {
    top: 1,
    bottom: 2,
    left: 3,
    right: 4,
    topLeft: 5,
    topRight: 6,
    bottomLeft: 7,
    bottomRight: 8,
    center: 9,
    allEqual: 10,
  };

  const { topLeft, topRight, bottomLeft, bottomRight, center } = quadrantClicks;

  const top = topLeft + topRight;
  const bottom = bottomLeft + bottomRight;
  const left = topLeft + bottomLeft;
  const right = topRight + bottomRight;

  const regionCounts = {
    [regionCodes.topLeft]: topLeft,
    [regionCodes.topRight]: topRight,
    [regionCodes.bottomLeft]: bottomLeft,
    [regionCodes.bottomRight]: bottomRight,
    [regionCodes.center]: center,
    [regionCodes.top]: top,
    [regionCodes.bottom]: bottom,
    [regionCodes.left]: left,
    [regionCodes.right]: right,
  };

  // Get region with max count
  const maxCount = Math.max(...Object.values(regionCounts));
  const maxRegions = Object.keys(regionCounts).filter(
    (key) => regionCounts[key] === maxCount
  );

  let finalQuadrantCode;

  if (maxRegions.length === 1) {
    finalQuadrantCode = parseInt(maxRegions[0]);
  } else {
    finalQuadrantCode = regionCodes.allEqual;
  }

  // alert(
  //   correctOddSelections.length > 0
  //     ? `${correctOddSelections.length} odd tiles were correctly identified.\nFinal Quadrant Code: ${finalQuadrantCode}`
  //     : `No odd tiles were correctly identified.\nFinal Quadrant Code: ${finalQuadrantCode}`
  // );

  // const cvi_submission = {
  //   finalScore: correct,
  //   totalClicks: totalClicked,
  //   wrongSelect: wrongClicked,
  //   finalQuadrantCode,
  // };

const updatedData = {
  ...formData,
  cviScore: {
    finalScore: correct,
    totalClicks: totalClicked,
    wrongSelect: wrongClicked,
    finalQuadrantCode: finalQuadrantCode,
  }
};

setFormData(updatedData);

navigate('/three_tests', {
  state: updatedData
});



  // console.log("Submitting to backend.", cvi_submission);
  // navigate('/three_tests');
};

  return (
    <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-auto min-h-screen p-6">
      <div className="max-w-7xl mx-auto p-6 relative z-10 bg-black bg-opacity-20 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-50">Pick the Pink Color Tiles</h2>
        <p className="text-gray-50 mb-4">
          Please select all the PINK TILES as accurately as possible.
          Please scroll down to submit this test and move on to the next page.
        </p>
      </div>

      <div className="flex-grow px-4 py-2">
        <div className="grid grid-cols-10 gap-4">
          {cards.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`rounded-md border-4 ${
                selected.includes(idx) ? "border-pink-500" : "border-gray-500"
              }`}
              style={{ backgroundColor: item.color, cursor: 'pointer', height: '100px' }}
            ></div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-gray-50 py-4 px-20 rounded text-2xl font-semibold"
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default CviTest;
