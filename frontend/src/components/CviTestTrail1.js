import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const colorOptions = ['black', 'pink'];
const matching = colorOptions[0];
const different = colorOptions[1];

// CviTest Component
const CviTest = () => {
  // Generate a set of cards with black ones placed at random positions
  // total = 12 cards
  // 3 or 4 will be black
  const [cards, setCards] = useState([]);

  const [selected, setSelected] = useState([]);

  const [oddCardIndices, setOddCardIndices] = useState([]);

  // const [userid, setUserid] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      console.error("No state passed to CviTest.");
      navigate('/three_tests'); // fallback
      return;
    }


    // Generate cards
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
  }, [location.state, navigate,  cards.length]);

  if (!location.state) return null;

  const handleSelect = (index) => {
    setSelected((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

  const handleSubmit = async () => {
    let correct = 0;

    selected.forEach((selectedIdx) => {
      if (oddCardIndices.includes(selectedIdx)) correct++;
    });

    // Calculate max and min index for black cards that were correct
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
    } else {
      alert("No black cards were correctly identified.");
    }

    // Prepare data to send to backend
    const cvi_submission ={
        score: correct,
        total: oddCardIndices.length,
        maxIdx,
        minIdx,
      };

    try {
      console.log("Submitting to backend.", cvi_submission);
      // Send to backend with axios
      const response = await axios.post(
        "https://kailas.kattangal.online/api/formdata/cvi",
        cvi_submission,
        {
          headers: { "Content-Type": "application/json" },
          validateStatus: function (status) {
            return status >= 200 && status < 500;
          },
        }
      );
      console.log("POST response.", response);
      if (response.status >= 200 && response.status < 300) {
        console.log("CVI data successfully submitted.");
        // If submission is successful, navigate to the next page
        navigate('/three_tests'); // Change this to your route
      } else {
        console.error("Failed to submit data.", response);
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error while submitting to backend.", error);
      alert("Error while submitting.");
    }
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
