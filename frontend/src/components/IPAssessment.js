import React, { useState,useEffect,useRef } from "react";
import testimage from "../media/ip_test_material/visual_test.jpg"; // Replace with your actual image path
import testaudio from "../media/ip_test_material/ip_audio.mp4"; // Replace with your actual audio path
import { useLocation,useNavigate  } from "react-router-dom";

const textRecap = `
Exploring Space: 
Space is a huge place that begins just above the Earth’s atmosphere. It has no air, so astronauts need special suits to breathe and stay safe. The Earth is part of a group of planets called the solar system, which moves around the Sun. There are also stars, moons, comets, and asteroids in space. Some stars are much bigger than the Sun, while others are smaller. Scientists called astronomers use telescopes to study space and discover new things about the universe. Space is still full of mysteries waiting to be explored!`;

const textQuestions = [
  {
    question: " What do we call the group of planets that move around the Sun?",
    options: ["Galaxy", "Solar System", "Universe", "Asteroid belt"],
    correctAnswer: "Solar System",
  },
  {
    question: "Why do astronauts wear special suits in space?",
    options: [
      "To fly faster",
      "To carry heavy things",
      "Because there is no air in space",
      "To look cool",
    ],
    correctAnswer: "Because there is no air in space",
  },
  {
    question:
      " If you wanted to see a star that is far away, what tool would you use?",
    options: [
      "Microscope",
      "Telescope",
      "Binoculars",
      "Calculator",
    ],
    correctAnswer: "Telescope",
  },
  {
    question: "What might happen if there were no astronomers studying space?",
    options: [
      "We would know less about the universe",
      "The planets would stop moving",
      "Stars would disappear",
      "Astronauts could not fly to space",
    ],
    correctAnswer:
      "We would know less about the universe",
  },
  {
    question:
      " Which of these is the most important reason to protect Earth while exploring space?",
    options: ["Because space has no trees or oceans", "Because Earth is our home and has life", "Because astronauts need a place to practice flying", "Because space is too cold"],
    correctAnswer: "Because Earth is our home and has life",
  },
  {
    question: " If you could design a space mission, what would you choose to explore?",
    options: [
      " A new planet to learn about its weather and land",
      "A playground in space",
      "A spaceship that only goes in circles",
      " A place with nothing to discover",
    ],
    correctAnswer: " A new planet to learn about its weather and land",
  },
];

const visualRecap = `
Look carefully at the image provided and answer the questions based on your memory of it.
`;

const visualQuestions = [
  {
    question: "What is the sequence of seasons in the image?",
    options: [
      "Summer, Winter, Spring, Autumn",
      "Winter, Summer, Autumn, Spring",
      "Winter, Spring, Summer, Autumn",
      "Autumn, Winter, Spring, Summer",
    ],
    correctAnswer: "Winter, Spring, Summer, Autumn",
  },

  {
    question: "What is happening to the leaves in the autumn part of the picture?",
    options: ["They are growing bigger", "They are falling and changing color", "They are covered in snow", "They are turning into flowers"],
    correctAnswer: "They are falling and changing color",
  },

  {
    question: "	If you wanted to pick a flowering tree, which part of the image shows the best time to do that?",
    options: [
      "Summer", "Winter", "Autumn", "Spring"],
    correctAnswer: "Spring",
  },
  {
    question: "Compare the tree in winter and summer. What is the biggest difference you can see?",
    options: [
      "The tree is taller in summer",
      "The tree has leaves in summer but none in winter",
      " The tree changes into a different kind of tree",
      "The tree moves to a new place",
    ],
    correctAnswer: "The tree has leaves in summer but none in winter",
  },

  {
    question: "In which season does the tree look most empty in the picture?",
    options: ["Summer", "Winter", "Autumn", "Spring"],
    correctAnswer: "Winter",
  },

  {
    question: 'If you could add one more small detail to the autumn part of the picture, what would match best?',
    options: ["Wind blowing the leaves", "Snow falling from the sky", "New flowers growing", "Green leaves getting bigger"],
    correctAnswer: "Wind blowing the leaves", // Assuming the image shows a square, circle, and triangle
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
      "Alarm clock",
      "Rain falling",
      " Dog barking",
      "Pages turning",
    ],
    correctAnswer: "Rain falling",
  },

  {
    question: "What does the first sound usually tell you?",
    options: [
      "It’s time to wake up",
      "It’s raining",
      "Someone is reading",
      " A dog is barking",
    ],
    correctAnswer: "It’s time to wake up",
  },

  {
    question:
      "	If you hear pages turning, where are you most likely?",
    options: [
      " In a library or reading at home",
      "In the kitchen",
      "Outside in the rain",
      "At a dog park",
    ],
    correctAnswer: " In a library or reading at home",
  },

  {
    question:
      '	How is the dog barking sound different from the other three sounds?',
    options: [
      "It is softer than all other sounds",
      "It happens at night only",
      "It is made by an animal",
      "It sounds like rain",
    ],
    correctAnswer: "It is made by an animal",
  },

  {
    question:
      "	If you could only listen to one of these sounds to know what time of day it is, which would you choose?",
    options: [
      "Dog barking",
      "Rain falling",
      "Pages turning",
      "Alarm clock",
    ],
    correctAnswer: "Alarm clock",
  },

  {
    question:
      "	If you wanted to make an audio about your morning, which two sounds would you include?",
    options: [
      " Pages turning and dog barking",
      "Alarm clock and pages turning",
      " Rain falling and pages turning",
      "Dog barking and rain falling",
    ],
    correctAnswer: "Alarm clock and pages turning",
  },
  // Add other auditory questions here...
];

const IPAssessment = () => {
  const [currentStep, setCurrentStep] = useState("intro");
  const [currentSection, setCurrentSection] = useState("text");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false); 
  
  const [sectionScore, setSectionScore] = useState({
    text: 0,
    image: 0,
    audio: 0,
  });

  
  const location = useLocation();
  const navigate = useNavigate();
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
          // updateScoresIP(updatedScores);
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
          if (vIssue === "full") {
              if (aIssue) {
                setCurrentStep("results");
                //  markIPComplete();
                // setIsCompleted(true); // skip both visual and audio
              } else {
                startSection("audio"); // skip visual, do audio
              }
            } else {
              startSection("image"); // visual is okay
            }
        } else if (currentSection === "image") {
          if (aIssue) {
          setCurrentStep("results"); // skip audio
          // setIsCompleted(true);
          //  markIPComplete();
          } else {
            startSection("audio"); // audio is okay
          }
        }  else if (currentSection === "audio") {
          setCurrentStep("results");
          // markIPComplete();
          // setIsCompleted(true);
        }
        
      }
    }
  };
  

  const getCurrentQuestions = () => {
    switch (currentSection) {
      case "text":
        return textQuestions;
      case "image":
        return visualQuestions;
      case "audio":
        return auditoryQuestions;
      default:
        return [];
    }
  };

const hasInitializedRef = useRef(false);
useEffect(() => {
  if (aIssue && vIssue === "full" && !hasInitializedRef.current) {
    hasInitializedRef.current = true;
    
    // updateScoresIP({ text: 0, image: 0, audio: 0 }); // Optional: to record skipped section
    setIsCompleted(true);
    // markIPComplete();
  }
}, [aIssue, vIssue]);


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

useEffect(() => {
  if (currentStep === "results" && !isCompleted) {
    const finalScore = sectionScore.text + sectionScore.image + sectionScore.audio;
    const updatedFormData = {
      ...formData,
      ipScore: {
        text: sectionScore.text,
        image: sectionScore.image,
        audio: sectionScore.audio,
        total: finalScore,
      }
    };
    setFormData(updatedFormData);
    setIsCompleted(true);
    console.log("✅ IP Assessment completed. Final formData:", updatedFormData);
  }
}, [currentStep, isCompleted, formData, sectionScore]);



// useEffect(() => {
//   if (isCompleted) {
//     console.log("✅ IPAssessment completed. Final formData:", formData);
//   }
// }, [isCompleted, formData]);

  if (aIssue && vIssue === "full") {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">No Applicable Tests</h1>
        <p className="text-xl mt-4">You may skip this section.</p>
         <button
            onClick={() => {
              navigate("/wmc_test", { state: formData });  // Pass formData to next test
            }}
            className="mt-6 bg-blue-700 hover:bg-green-800 text-white font-semibold py-4 px-6 rounded shadow transition duration-200"
          >
            Next Page
          </button>
      </div>
    );
  }

  //  if (isCompleted) {
  //   return (
  //     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
  //       <h1 className="text-2xl font-bold">This Section Completed</h1>
  //       <p className="text-xl mt-4">Go on to the next test below</p>
  //     </div>
  //   );
  // }


  return (
  <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden">
  <div ref={starContainerRef} className="absolute inset-0 bg-stars overflow-hidden"></div>

    {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"> */}
  <div className={`absolute ${getQuadrantStyle(quadrant)} p-6 bg-white rounded-lg overflow-auto resize shadow-lg`}
      style={{
    // minWidth: '33vw',
    // minHeight: '40vh',
    maxWidth: '90vw',
    maxHeight: '80vh',
    width: '33vw',
    // height: '45vh',
    boxSizing: 'border-box',
  }}
      >
        {currentStep === "intro" && (
          <div>
            <h2 className="text-lg font-bold mb-4">General Instructions</h2>
            <div className="mb-4">
              This test will assess your ability to process information across three sections:{" "}
              <strong>Text, Visual, and Auditory</strong> (depending on sections which are applicable to you). Each section includes
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
              onClick={() => {
                if (vIssue === "full" && aIssue) {
                //   // If both are fully impaired, no test to take
                //   // alert("Sorry, both visual and auditory assessments are skipped based on your condition.");
                  setCurrentStep("results");
                } else if (vIssue === "full") {
                  startSection("audio"); // only auditory
                } else if (aIssue) {
                  startSection("text"); // only text and visual
                } else {
                  startSection("text"); // default first section
                }
              }}
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
                : currentSection === "image"
                ? "Visual Test"
                : "Auditory Test"}
            </h2>
            <p className="mb-4">
              {currentSection === "text"
                ? textRecap
                : currentSection === "image"
                ? visualRecap
                : auditoryRecap}
            </p>
            {currentSection === "image" && (
              <img
                src={testimage}
                alt="Visual Memory Test"
                className="w-full mb-4"
              />
            )}
            {currentSection === "audio" && (
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
        //  <div className="text-center">
          // <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
            <div className="w-full h-full flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-6 text-center overflow-auto">
          <h1 className="text-2xl font-bold">This Section Completed</h1>
          <button
            onClick={() => {
              navigate("/wmc_test", { state: formData });  // Pass formData to next test
            }}
            className="mt-6 bg-blue-700 hover:bg-green-800 text-white font-semibold py-4 px-6 rounded shadow transition duration-200"
          >
            Next Page
          </button>
          {/* <p className="text-xl mt-4">You may submit the form if all sections are complete.</p>  */}
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
    // </div>
  );
};

export default IPAssessment;
