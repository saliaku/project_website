import React, { useState,useEffect,useRef } from "react";
import testimage from "../media/ip_test_material/visual_test.jpeg"; // Replace with your actual image path
import testaudio from "../media/ip_test_material/audio_test.mp4"; // Replace with your actual audio path
import queimage from "../media/ip_test_material/option3.jpg"; 
import { useLocation,useNavigate  } from "react-router-dom";

const textRecap = `
The water cycle is how water moves around the Earth. It starts when the Sun heats water in oceans, lakes, and rivers, turning it into vapor, which rises into the sky. This is called evaporation. The water vapor cools and forms clouds, a process called condensation. When the clouds get heavy, water falls back to the Earth as rain, snow, or hail—this is called precipitation. The water then flows back into rivers and oceans, ready to start the cycle again. This process helps keep plants, animals, and people alive.`;

const textQuestions = [
  {
    question: "What is the process called when water turns into vapor and rises into the sky?",
    options: ["Precipitation", "Evaporation", "Condensation", "Freezing"],
    correctAnswer: "Evaporation",
  },
  {
    question: 'Why do clouds form in the sky?',
    options: [
      "Water vapor cools and turns into clouds",
      "The Sun heats the clouds",
      "Rain falls and creates clouds",
      " Clouds rise from the ground",
    ],
    correctAnswer: "Water vapor cools and turns into clouds",
  },
  {
    question:
      "On a very sunny day, which part of the water cycle is likely to happen faster?",
    options: [
      " Condensation",
      "Evaporation",
      "Precipitation",
      "Freezing",
    ],
    correctAnswer: "Evaporation",
  },
  {
    question: "What could happen to plants if there was no precipitation for a long time?",
    options: [
      "Plants would grow taller",
      "Plants would dry out and may die",
      " Plants would have extra water",
      "Plants would turn into clouds",
    ],
    correctAnswer:
      "Plants would dry out and may die",
  },
  {
    question:
      "Why is the water cycle important for life on Earth?",
    options: [" It creates electricity", "It keeps water clean and flowing for plants, animals, and people", "It makes the Sun shine brighter", "It helps clouds stay in the sky"],
    correctAnswer: "It keeps water clean and flowing for plants, animals, and people",
  },
  {
    question: "If you were to write a story about the water cycle, what would be the best way to start?",
    options: [
      "Describe a raindrop falling from a cloud",
      "Begin with a water droplet in the ocean",
      "Show plants using water to grow",
      "Introduce a river flowing to the ocean",
    ],
    correctAnswer: "Begin with a water droplet in the ocean",
  },
];

const visualRecap = `
Look carefully at the image provided and answer the questions based on your memory of it.
`;

const visualQuestions = [
  {
    question: "Which is the correct order of shapes in the image?",
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
    question: "Is Square a Rectangle?",
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
