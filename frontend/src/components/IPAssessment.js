import React, { useState } from 'react';

// Example prompts; update paths according to your folder structure
const prompts = [
  { id: 1, type: 'image', src: require('../media/images/image1.jpeg').default },
  { id: 2, type: 'audio', src: require('../media/audio/audio1.mp3').default },
  { id: 3, type: 'text', content: 'What are the benefits of apples?' },
  // Add more prompts as needed
];

const questions = [
  "Remember?",
  "Understand?",
  "Apply?",
  "Analyze?",
  "Evaluate?",
  "Create?"
];

const IPAssessment = ({ updateScoresIP }) => {
  const [currentPromptIndex] = useState(0); // Assuming only one prompt for now
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(Array(6).fill(null)); // For 6 questions
  const [isCompleted, setIsCompleted] = useState(false);

  const handleScoreChange = (score) => {
    const newScores = [...scores];
    newScores[currentQuestionIndex] = score;
    setScores(newScores);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < 5) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Update scores and set completion state
      updateScoresIP(scores);
      setIsCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const currentPrompt = prompts[currentPromptIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        {!isCompleted ? (
          <>
            <div className="mb-4">
              {currentPrompt.type === 'image' && (
                <img src={currentPrompt.src} alt="Visual" className="rounded-lg w-full h-auto" />
              )}
              {currentPrompt.type === 'audio' && (
                <audio controls className="w-full mt-2" src={currentPrompt.src}></audio>
              )}
              {currentPrompt.type === 'text' && (
                <p className="text-lg font-semibold text-center">{currentPrompt.content}</p>
              )}
            </div>
            <div className="mb-4">
              <p className="font-medium">Question {currentQuestionIndex + 1}: How well do you...</p>
              <p className="mb-2">{questions[currentQuestionIndex]}</p>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((score) => (
                  <button
                    key={score}
                    onClick={() => handleScoreChange(score)}
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <button
                onClick={handlePreviousQuestion}
                className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200 ${
                  currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </button>
              <button
                onClick={handleNextQuestion}
                className="bg-green-500 text-white font-semibold py-2 rounded shadow hover:bg-green-600 transition duration-200"
              >
                {currentQuestionIndex < 5 ? 'Next Question' : 'Finish'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-lg font-bold">Congratulations!</h2>
            <p>You've successfully completed the assessment.</p>
            {/* <p>Your scores: {scores.join(', ')}</p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default IPAssessment;
