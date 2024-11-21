import React, { useState } from "react";
import testimage from "../media/ip_test_material/visual_test.jpeg"; // Replace with your actual image path
import testaudio from "../media/ip_test_material/audio_test.mp4"; // Replace with your actual audio path
import queimage from "../media/ip_test_material/option3.jpg"; 

const textRecap = `
How Do We Remember Things?     
Your brain helps you remember all kinds of things, like facts for a test or what you ate for breakfast. Memory works in three steps: first, you take in information through your senses, like seeing or hearing. This is called encoding. Next, your brain stores that information in either short-term or long-term memory. Short-term memory is like a chalkboard—it can hold things for a little while. Long-term memory is like a computer that saves things for a long time. Finally, when you need to remember something, your brain retrieves it. This means it brings the information back so you can use it. Sometimes we forget things because we didn't pay attention, or because our brain got too busy!`;

const textQuestions = [
  {
    question: "What is the first step in remembering something?",
    options: ["Storing", "Encoding", "Retrieving", "Forgetting"],
    correctAnswer: "Encoding",
  },
  {
    question: 'What happens during the "retrieving" step of memory?',
    options: [
      "Your brain brings back information so you can use it.",
      "Your brain forgets information.",
      "Your brain stores information in short-term memory.",
      "Your brain learns new things.",
    ],
    correctAnswer: "Your brain brings back information so you can use it.",
  },
  {
    question:
      "If you are trying to remember your friend's phone number until you can write it down, which type of memory are you using?",
    options: [
      "Long-term memory",
      "Forgetting memory",
      "Short-term memory",
      "Retrieval memory",
    ],
    correctAnswer: "Short-term memory",
  },
  {
    question: "Why might you forget something like where you put your keys?",
    options: [
      "Because your brain retrieved the information",
      "Because you didn’t pay enough attention when putting them down",
      "Because your long-term memory is full",
      "Because your brain encoded the information wrong",
    ],
    correctAnswer:
      "Because you didn’t pay enough attention when putting them down",
  },
  {
    question:
      "Which type of memory do you think is more important for remembering things over many years?",
    options: ["Long-term memory", "Short-term memory", "Encoding", "Retrieval"],
    correctAnswer: "Long-term memory",
  },
  {
    question: "If you were designing a memory game to help students remember facts, which step of memory (as explained in the text) would you focus on enhancing the most?",
    options: [
      "Encoding, by making the information visually appealing and interactive.",
      "Storing, by adding multiple storage devices to the brain.",
      "Retrieval, by ensuring students can guess the answers randomly.",
      "Forgetting, to ensure students discard unimportant facts.",
    ],
    correctAnswer: "Encoding, by making the information visually appealing and interactive.",
  },
];

const visualRecap = `
Look carefully at the image provided and answer the questions based on your memory of it.
`;

const visualQuestions = [
  {
    question: "What shapes are in the image?",
    options: [
      "Circle, square, rectangle",
      "Triangle, circle, square",
      "Square, circle, triangle",
      "Rectangle, triangle, circle",
    ],
    correctAnswer: "Square, circle, triangle",
  },

  {
    question: "What geometric property does the square have?",
    options: ["All sides are equal", "No sides are equal", "It has no straight lines", "It has only one side"],
    correctAnswer: "All sides are equal",
  },

  {
    question: "Is Square a Rectangle ?",
    options: [
      "Yes",
      "No",
    ],
    correctAnswer: "Yes",
  },
  {
    question: "Which shapes are symmetrical? (Symmetry means if you fold a shape along a line, both sides will match perfectly.)",
    options: [
      "Circle and triangle",
      "Square and circle",
      "Only the square",
      "All shapes",
    ],
    correctAnswer: "All shapes",
  },

  {
    question: " Which shape would be the most difficult to draw freehand?",
    options: ["square", "triangle", "circle", "All"],
    correctAnswer: "circle",
  },

  {
    question: 'Can this image be created using the shapes given ?',
    options: ['Yes', 'No'],
    correctAnswer: 'No', // Assuming the image shows a square, circle, and triangle
    image: queimage, // Path to the image generated or created from shapes
  },

  // Add other visual questions here...
];

const auditoryRecap = `
Listen carefully to the audio clip and answer the questions based on what you remember hearing.
`;

const auditoryQuestions = [
  {
    question: "What was the second sound in the audio clip?",
    options: [
      "A car honking",
      "A high-pitched bell",
      "Thunder",
      "Birds chirping",
    ],
    correctAnswer: "Thunder",
  },

  {
    question: "What does the sound of a car honking typically indicate?",
    options: [
      "A warning or attention",
      "A relaxing atmosphere",
      " The start of a storm",
      "A bird is nearby",
    ],
    correctAnswer: "A warning or attention",
  },

  {
    question:
      "If you wanted to simulate an incoming storm in a soundscape, which of these sounds would you focus on?",
    options: [
      "A car honking",
      "A high-pitched bell",
      "Thunder",
      "Birds chirping",
    ],
    correctAnswer: "Thunder",
  },

  {
    question:
      'Which two sounds in the sequence can be categorized as "natural"',
    options: [
      "Car honking and high-pitched bell",
      " Thunder and birds chirping",
      "High-pitched bell and birds chirping",
      "Thunder and car honking",
    ],
    correctAnswer: " Thunder and birds chirping",
  },

  {
    question:
      "You are designing an alarm system for use during a thunderstorm. Which sound would be the least reliable for alerting people during the storm?",
    options: [
      "A car honking",
      "A high-pitched bell",
      "Thunder",
      "Birds chirping",
    ],
    correctAnswer: "Thunder",
  },

  {
    question:
      " How would you use the sounds to enhance a storytelling scene about a peaceful morning turning into chaos?",
    options: [
      "Birds chirping → Car honking → Thunder",
      "Car honking → Birds chirping → Thunder",
      "Thunder → High-pitched bell → Birds chirping",
      "Thunder → High-pitched bell → Car honking",
    ],
    correctAnswer: "Birds chirping → Car honking → Thunder",
  },
  // Add other auditory questions here...
];

const IPAssessment = ({ updateScoresIP }) => {
  const [currentStep, setCurrentStep] = useState("intro");
  const [currentSection, setCurrentSection] = useState("text");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sectionScore, setSectionScore] = useState({
    text: 0,
    visual: 0,
    auditory: 0,
  });

  const startSection = (section) => {
    setCurrentSection(section);
    setCurrentQuestionIndex(0);
    setCurrentStep("recap");
  };

  const handleAnswerSelect = (selectedOption) => {
    const currentQuestions = getCurrentQuestions();
    
    if (currentQuestions && currentQuestionIndex < currentQuestions.length) {
      const isCorrect = 
        selectedOption === currentQuestions[currentQuestionIndex].correctAnswer;
      
      if (isCorrect) {
        // Increment the section-specific score and update IP scores
        setSectionScore((prevSectionScore) => {
          const updatedScores = {
            ...prevSectionScore,
            [currentSection]: prevSectionScore[currentSection] + 1,
          };
          // Update the overall score in parent component
          updateScoresIP(updatedScores);
          return updatedScores;
        });
  
        // Increment the total score
        setScore((prevScore) => prevScore + 1);
      }
  
      // Check if there are more questions in the current section
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        // Move to the next section or show results
        if (currentSection === "text") {
          startSection("visual");
        } else if (currentSection === "visual") {
          startSection("auditory");
        } else {
          setCurrentStep("results");
        }
      }
    }
  };
  

  const getCurrentQuestions = () => {
    switch (currentSection) {
      case "text":
        return textQuestions;
      case "visual":
        return visualQuestions;
      case "auditory":
        return auditoryQuestions;
      default:
        return [];
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        {currentStep === "intro" && (
          <div>
            <h2 className="text-lg font-bold mb-4">General Instructions</h2>
            <div className="mb-4">
              This test will assess your ability to process information across three sections:{" "}
              <strong>Text, Visual, and Auditory</strong>. Each section includes
              multiple-choice questions (MCQs) based on the provided content.
              Follow these instructions for a successful attempt:
              <ul className="list-disc pl-5 mt-2 mb-4">
                <li>
                  Read the text or observe/listen carefully before answering the
                  given set of questions.
                </li>
                <li>
                  Each question has four options, and you need to select the one
                  you believe is correct.
                </li>
                <li>Click on your answer to proceed to the next question.</li>
                <li>
                  Try to stay focused and avoid distractions to maximize your
                  recall ability.
                </li>
              </ul>
              Take your time and do your best—good luck!
            </div>
            <button
              onClick={() => startSection("text")}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
            >
              Next
            </button>
          </div>
        )}

        {currentStep === "recap" && (
          <div>
            <h2 className="text-lg font-bold mb-4">
              {currentSection === "text"
                ? "Read the below passage carefully"
                : currentSection === "visual"
                ? "Visual Test"
                : "Auditory Test"}
            </h2>
            <p className="mb-4">
              {currentSection === "text"
                ? textRecap
                : currentSection === "visual"
                ? visualRecap
                : auditoryRecap}
            </p>
            {currentSection === "visual" && (
              <img
                src={testimage}
                alt="Visual Memory Test"
                className="w-full mb-4"
              />
            )}
            {currentSection === "auditory" && (
              <audio controls className="w-full mb-4">
                <source src={testaudio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            <button
              onClick={() => setCurrentStep("questions")}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 transition duration-200"
            >
              Start Quiz
              {/* {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} */}
            </button>
          </div>
        )}

        {currentStep === "questions" && (
          <div>
            {getCurrentQuestions()[currentQuestionIndex] ? (
              <>
                <h2 className="text-lg font-bold mb-4">
                  Question {currentQuestionIndex + 1}
                </h2>
                <p className="mb-4">
                  {getCurrentQuestions()[currentQuestionIndex].question}
                </p>
                <div>
                {getCurrentQuestions()[currentQuestionIndex].image&& (
                  <img
                  src={getCurrentQuestions()[currentQuestionIndex].image}
                  alt="Question related visual"
                  className="mb-4"
                />
                  )}
                </div>
                <div>
                  {getCurrentQuestions()[currentQuestionIndex].options.map(
                    (option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className="block w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow mb-2 hover:bg-blue-600 transition duration-200"
                      >
                        {option}
                      </button>
                    )
                  )}
                </div>
              </>
            ) : (
              <p className="text-red-500">
                Error loading question. Please try again.
              </p>
            )}
          </div>
        )}

        {currentStep === "results" && (
          // <div className="text-center">
          <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold">This Section Completed</h1>
          <p className="text-xl mt-4">You may submit the form if all sections are complete.</p>
         {/* </div> */}
            {/* <p>
              Your total score: {score} out of{" "}
              {textQuestions.length +
                visualQuestions.length +
                auditoryQuestions.length}
            </p>
            <p>
              Text section score: {sectionScore.text} / {textQuestions.length}
            </p>
            <p>
              Visual section score: {sectionScore.visual} /{" "}
              {visualQuestions.length}
            </p>
            <p>
              Auditory section score: {sectionScore.auditory} /{" "}
              {auditoryQuestions.length}
            </p>
            <p className="mt-2">
              {score >= 10 ? "Excellent memory skills!" : "Keep practicing!"}
            </p> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default IPAssessment;
