import React, { useState, useEffect, useRef } from 'react';
// import ReadabilityAssessment from '../components/ReadabilityAssessment';
// import WMCAssessment from '../components/WCAssessment';
// import IPAssessment from '../components/IPAssessment';
// import CviTest from '../components/CviTest'; 
import "../index.css"; // Import your Tailwind CSS
// import axios from 'axios'; // Import axios if you're using it
import { useNavigate } from 'react-router-dom';

const SurveyPage = () => {

  useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const userId = params.get('userid');
      const cmid = params.get('cmid');
      console.log('User ID:', userId);
      console.log('CMID:', cmid);
  
      if(userId && cmid) {
        setFormData({ userId: userId });
        setFormData((prev) => ({ ...prev, cmid: cmid }));
      }
      else
      {
        alert('User ID not found in URL. Please provide a valid User ID.');
      }
  
    }, []);

  const [formData, setFormData] = useState({
    cmid: '',
    userId: '',
    name: 'student',
    school: 'school',
    rollNumber: '1',
    fleschScore: 0,
    ipScore: {
      image: 0,
      audio: 0,
      text: 0,
    },
    wmcScore: {
      image: 0,
      audio: 0,
      text: 0,
    },
    vatScore:{
      v:0,
      a:0,
      t:0,
    },
    cviScore: {
    finalScore: 0,
    totalClicks: 0,
    wrongSelect: 0,
    finalQuadrantCode: 10,
  },
  auditoryIssue:'',
  visualIssue:'',
  });

  //  const calculateVATScores = () => {
  //   const { wmcScore, ipScore } = formData;

  //   const wmv = wmcScore.image;
  //   const wma = wmcScore.audio;
  //   const wmt = wmcScore.text;
  //   const ipv = ipScore.image;
  //   const ipa = ipScore.audio;
  //   const ipt = ipScore.text;

  //   const S = wmv + wma + wmt + ipv + ipa + ipt;

  //   if (S === 0) return { v: 0, a: 0, t: 0 };

  //   const v = (wmv + ipv) / S;
  //   const a = (wma + ipa) / S;
  //   const t = (wmt + ipt) / S;

  //   return { v: parseFloat(v.toFixed(3)), a: parseFloat(a.toFixed(3)), t: parseFloat(t.toFixed(3)) };
  // };

  //  useEffect(() => {
  //   if (completedTests.readability && completedTests.wmc && completedTests.ip) {
  //     const vat = calculateVATScores();
  //     setFormData((prev) => ({ ...prev, vatScore: vat }));
  //   }
  // }, [completedTests]);

  const navigate = useNavigate();

  const sendFormDataToBackend = async () => {
    if (!formData.visualIssue || !formData.auditoryIssue) {
        alert('Please fill in all details & attempt the tests.');
        return;
    }

    // if (!completedTests.readability || !completedTests.wmc || !completedTests.ip) {
    //   alert('Please complete all assessments (Readability, WMC, and IP) before submitting.');
    //   return;
    // }
    
    
    // try {
    //   console.log('Sending form data:', { ...formData });

    //   const response = await axios.post(
    //     'https://kailas.kattangal.online/api/formdata',
    //     formData, 
    //     {
    //       headers: { 'Content-Type': 'application/json' },
    //       validateStatus: (status) => status >= 200 && status < 500,
    //     }
    //   );

      // if (response.status === 201 || response.status === 200) {
      //   alert('Form data sent successfully!');

    if (formData.visualIssue === "full" && formData.auditoryIssue === "yes") {
      const updatedFormData = {
        ...formData,
        name: 'student',
        school: 'school',
        rollNumber: '1',
        fleschScore: 0,
        ipScore: { image: 0, audio: 0, text: 0 },
        wmcScore: { image: 0, audio: 0, text: 0 },
        vatScore: { v: 0, a: 0, t: 0 },
        cviScore: {
          finalScore: 0,
          totalClicks: 0,
          wrongSelect: 0,
          finalQuadrantCode: 10,
        }
      };

    setFormData(updatedFormData);
    navigate("/notest", { state: updatedFormData });
  }


     else if (formData.visualIssue === "full") {
        const updatedFormData = {
          ...formData,
          name: 'student',
          school: 'school',
          rollNumber: '1',
          fleschScore: 0,
          cviScore: {
            finalScore: 0,
            totalClicks: 0,
            wrongSelect: 0,
            finalQuadrantCode: 10,
          }
        };
        setFormData(updatedFormData);
        navigate("/ip_test", { state: updatedFormData });
      }


      else {
        const updatedFormData = {
          ...formData,
          name: 'student',
          school: 'school',
          rollNumber: '1',
           };
        setFormData(updatedFormData);
        navigate("/visual_perception_test", { state: { ...updatedFormData } }); // Go to CVI
      }
        
        

//       } else {
//         throw new Error(`Server responded with status ${response.status}`);
//       }
//     } catch (error) {
//       console.error('Error details:', {
//             message: error.message,
//             response: error.response?.data,
//             status: error.response?.status
//         });
        
//         let errorMessage = 'Failed to send form data. ';
//         if (error.response) {
//             errorMessage += `Server responded with: ${error.response.data?.message || error.response.status}`;
//         } else if (error.request) {
//             errorMessage += 'No response received from server.';
//         } else {
//             errorMessage += error.message;
//         }
//       alert(errorMessage);
//     }
};

  // console.log(formData);

  // const [metrics, setMetrics] = useState({
  //   readabilityScore: 0,
  //   wmcScore: 0,
  //   ipScore: 0,
  //   cviScore: 0,
  // });

  // const [completedTests, setCompletedTests] = useState({
  //   readability: false,
  //   wmc: false,
  //   ip: false,
  //   cvi: false,

  // });

  // const [isReadabilityOpen, setReadabilityOpen] = useState(false);
  // const [isWMCOpen, setWMCOpen] = useState(false);
  // const [isIPOpen, setIPOpen] = useState(false);
  // const [isCVIOpen, setCVIOpen] = useState(false);


  // const toggleReadability = () => setReadabilityOpen(!isReadabilityOpen);
  // const toggleWMC = () => setWMCOpen(!isWMCOpen);
  // const toggleIP = () => setIPOpen(!isIPOpen);
  // const toggleCVI = () => setCVIOpen(!isCVIOpen);


  // const updateScores = (readabilityScore) => {
  //   setFormData((prev) => ({ ...prev, fleschScore: readabilityScore }));
  //   setMetrics((prev) => ({ ...prev, readabilityScore }));
  //   setCompletedTests((prev) => ({ ...prev, readability: true }));
  // };

  // const updateScoresIP = (ipScore) => {
  //   setFormData((prev) => ({ ...prev, ipScore: ipScore }));
  //   setMetrics((prev) => ({ ...prev, ipScore }));
  //   setCompletedTests((prev) => ({ ...prev, ip: true }));
  // };

  // const updateScoresWMC = (wmcScore) => {
  //   setFormData((prev) => ({ ...prev, wmcScore: wmcScore }));
  //   setMetrics((prev) => ({ ...prev, wmcScore }));
  //   setCompletedTests((prev) => ({ ...prev, wmc: true }));
  // };

  // const updateScoresCVI = (cviScore) => {
  // setFormData((prev) => ({ ...prev, cviScore: cviScore }));
  // setCompletedTests((prev) => ({ ...prev, cvi: true }));
  // };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const starContainerRef = useRef(null);

  useEffect(() => {
    const numStars = 50;
    const container = starContainerRef.current;

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

  return (
    <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden min-h-screen pb-0 mb-0">
      <div ref={starContainerRef} className="absolute inset-0 bg-stars overflow-hidden"></div>

      {/* General Instructions Section */}
      <div className="max-w-4xl mx-auto p-6 relative z-10 bg-black bg-opacity-20 rounded-lg shadow-md mb-6">
  <h2 className="text-2xl font-bold mb-4 text-white">General Instructions</h2>
  <p className="text-white mb-3">
    Please read the following instructions carefully before attempting the test:
  </p>
  <ul className="list-disc list-inside text-white">
    <li>Ensure you have a quiet environment to focus on the assessments.</li>
    <li>Complete each section to the best of your ability.</li>
    <li>Do not close a section without completing it.</li>
    <li>Do not refresh the page during the assessment.</li>
    <li>Attempt all questions in the given order.</li>
    <li>Once you submit your responses, it will be final.</li>
  </ul>
</div>

      <div className="max-w-4xl mx-auto p-6 relative z-10 pb-0 mb-0">
     {/*    <div className="space-y-6">
          <label className="block text-white mb-2">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        
            />
          </label>
          <label className="block text-white mb-2">
            School:
            <input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>

          <label className="block text-white mb-4">
            Roll Number:
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              className="w-full p-3 mt-2 mb-4 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div> */}


{/* 
        <div className="bg-gradient-to-r from-green-400 to-teal-500 shadow-md rounded-lg mb-4 overflow-hidden">
          <button
            className="w-full text-left px-6 py-4 font-semibold hover:bg-green-600 focus:outline-none"
            onClick={() => !completedTests.readability && setReadabilityOpen(!isReadabilityOpen)}
            disabled={completedTests.readability}
          >
            Readability Assessment
          </button>
          {isReadabilityOpen && (
            <div className="p-6 bg-gray-50 rounded-b-lg">
              <ReadabilityAssessment updateScores={updateScores} />
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-blue-400 to-indigo-500 shadow-md rounded-lg mb-4 overflow-hidden">
          <button
            className="w-full text-left px-6 py-4 font-semibold hover:bg-blue-600 focus:outline-none"
            onClick={() => !completedTests.wmc && setWMCOpen(!isWMCOpen)}
            disabled={completedTests.wmc}
          >
            WMC Assessment
          </button>
          {isWMCOpen && (
            <div className="p-6 bg-gray-50 rounded-b-lg">
              <WMCAssessment updateScoresWMC={updateScoresWMC} />
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-indigo-400 to-purple-500 shadow-md rounded-lg mb-4 overflow-hidden">
          <button
            className="w-full text-left px-6 py-4 font-semibold hover:bg-indigo-600 focus:outline-none"
            onClick={() => !completedTests.ip && setIPOpen(!isIPOpen)}
            disabled={completedTests.ip}
          >
            IP Assessment
          </button>
          {isIPOpen && (
            <div className="p-6 bg-gray-50 rounded-b-lg">
              <IPAssessment updateScoresIP={updateScoresIP} />
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-pink-400 to-red-500 shadow-md rounded-lg mb-4 overflow-hidden">
        <button
          className="w-full text-left px-6 py-4 font-semibold hover:bg-pink-600 focus:outline-none"
          onClick={() => !completedTests.cvi && setCVIOpen(!isCVIOpen)}
          disabled={completedTests.cvi}
        >
          CVI Assessment
        </button>
        {isCVIOpen && (
          <div className="p-6 bg-gray-50 rounded-b-lg">
            <CviTest updateScoresCVI={updateScoresCVI} />
          </div>
        )}
      </div>
 */}

 <label className="block text-white mb-2">
  Do you have any visual impairments ?
  <select
    name="visualIssue"
    value={formData.visualIssue}
    onChange={handleInputChange}
    className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
  >
    <option value="" disabled  >Please select the most appropriate option</option>
    <option value="none">I do not have any visual difficulties</option>
    <option value="partial">I have some level of visual difficulty</option>
    <option value="full">I am fully blind or have complete visual loss</option>

  </select>
</label>

<label className="block text-white mb-6">
  Do you have any hearing impairments ?
  <select
    name="auditoryIssue"
    value={formData.auditoryIssue}
    onChange={handleInputChange}
    className="w-full p-3 mt-2 border border-gray-300 rounded-lg text-black"
  >
    <option value="" disabled >Select an option</option>
    <option value="yes">Yes</option>
    <option value="no">No</option>
  </select>
</label>


        <button
    onClick={sendFormDataToBackend}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-20 rounded text-2xl font-bold center w-full"
>
    Next Page
</button>

      </div>
    </div>
  );
};

export default SurveyPage;
