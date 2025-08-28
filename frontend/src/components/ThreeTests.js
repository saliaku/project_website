import React, { useEffect, useState, useRef } from "react";
import ReadabilityAssessment from '../components/ReadabilityAssessment';
import WMCAssessment from '../components/WCAssessment';
import IPAssessment from '../components/IPAssessment';
import axios from 'axios'; // Import axios if you're using it
import "../index.css"; // Import your Tailwind CSS
import { useLocation ,useNavigate} from "react-router-dom";
import {calculateVATScores} from '../components/vat_calc';

const ThreeTests = () => {
  const navigate = useNavigate();
  const location = useLocation();  // ✅ correct position
  const incomingFormData = location.state || {};

    const [formData, setFormData] = useState({
            ...incomingFormData, // include data from previous pages

        fleschScore: '',
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
        
      });

    
    // const [metrics, setMetrics] = useState({
    //     readabilityScore: 0,
    //     wmcScore: 0,
    //     ipScore: 0,
    //     vatScore: 0,
    //   });
    
    const [completedTests, setCompletedTests] = useState({
        readability: false,
        wmc: false,
        ip: false,
        vat: false,
      });


//    const calculateVATScores = () => {
//     const { wmcScore, ipScore } = formData;

//     const wmv = wmcScore.image;
//     const wma = wmcScore.audio;
//     const wmt = wmcScore.text;
//     const ipv = ipScore.image;
//     const ipa = ipScore.audio;
//     const ipt = ipScore.text;

//     const S = wmv + wma + wmt + ipv + ipa + ipt;

//     if (S === 0) return { v: 0, a: 0, t: 0 };

//     const v = (wmv + ipv) / S;
//     const a = (wma + ipa) / S;
//     const t = (wmt + ipt) / S;

//     return { v: parseFloat(v.toFixed(3)), a: parseFloat(a.toFixed(3)), t: parseFloat(t.toFixed(3)) };
//   };
  
// useEffect(() => {
//   if (
//     completedTests.readability &&
//     completedTests.wmc &&
//     completedTests.ip &&
//     !completedTests.vat // new flag
//   ) {
//     const vat = calculateVATScores();
//     setFormData((prev) => ({ ...prev, vatScore: vat }));
//     setCompletedTests((prev) => ({ ...prev, vat: true })); // prevent re-runs
//   }
  
// }, [completedTests]);

// useEffect(() => {
//   if (completedTests.vat) {
//     console.log("✅ Final formData with VAT calculated:", formData);
//   }
// }, [completedTests.vat, formData]);


    const sendFormDataToBackend = async () => {
    
    if (!completedTests.readability || !completedTests.wmc || !completedTests.ip) {
      alert('Please complete all assessments (Readability, WMC, and IP) before submitting.');
      return;
    }
    
    navigate('/thankyou');
    
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

    console.log(formData);

    
  const [isReadabilityOpen, setReadabilityOpen] = useState(false);
  const [isWMCOpen, setWMCOpen] = useState(false);
  const [isIPOpen, setIPOpen] = useState(false);
    
  const toggleReadability = () => setReadabilityOpen(!isReadabilityOpen);
  const toggleWMC = () => setWMCOpen(!isWMCOpen);
  const toggleIP = () => setIPOpen(!isIPOpen);

    
  const updateScores = (readabilityScore) => {
    setFormData((prev) => ({ ...prev, fleschScore: readabilityScore }));
    // setMetrics((prev) => ({ ...prev, readabilityScore }));
    // setCompletedTests((prev) => ({ ...prev, readability: true }));
  };

  const updateScoresIP = (ipScore) => {
    setFormData((prev) => ({ ...prev, ipScore: ipScore }));
    // setMetrics((prev) => ({ ...prev, ipScore }));
    // setCompletedTests((prev) => ({ ...prev, ip: true }));
  };

  const updateScoresWMC = (wmcScore) => {
    setFormData((prev) => ({ ...prev, wmcScore: wmcScore }));
    // setMetrics((prev) => ({ ...prev, wmcScore }));
    // setCompletedTests((prev) => ({ ...prev, wmc: true }));
  };

  const markIPComplete = () => {
    setCompletedTests((prev) => ({ ...prev, ip: true }));
  };

  const markWMCComplete = () => {
    setCompletedTests((prev) => ({ ...prev, wmc: true }));
  };

  const markReadabilityComplete = () => {
    setCompletedTests((prev) => ({ ...prev, readability: true }));
  };

useEffect(() => {
  console.log("✅ Readability Done:", completedTests.readability);
  console.log("✅ WMC Done:", completedTests.wmc);
  console.log("✅ IP Done:", completedTests.ip);
  console.log("✅ FormData Now:", formData);
}, [completedTests, formData]);


  useEffect(() => {
  if (
    completedTests.readability &&
    completedTests.wmc &&
    completedTests.ip &&
    !completedTests.vat // ensure not already set
  ) {
    const vat = calculateVATScores(formData.wmcScore, formData.ipScore);
    setFormData((prev) => ({ ...prev, vatScore: vat }));
    console.log("✅ VAT scores updated in formData:", vat);
    setCompletedTests((prev) => ({ ...prev, vat: true }));
  }
}, [completedTests, formData.wmcScore, formData.ipScore]);

    
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

  
    
  return  (
    <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden min-h-screen pb-0 mb-0">
      <div ref={starContainerRef} className="absolute inset-0 bg-stars overflow-hidden"></div>

      <div className="max-w-4xl mx-auto p-6 relative z-10 bg-black bg-opacity-20 rounded-lg shadow-md mb-6">
    {/* <h2 className="text-2xl font-bold mb-4 text-white">General Instructions</h2> */}
    <p className="text-white mb-3">
      Please read the following instructions carefully before attempting the test:
    </p>
    <ul className="list-disc list-inside text-white">
      {/* <li>Ensure you have a quiet environment to focus on the assessments.</li> */}
      <li>Complete each section to the best of your ability.</li>
      <li>Do not close a section without completing it.</li>
      {/* <li>Do not refresh the page during the assessment.</li> */}
      <li>Attempt all questions in the given order.</li>
      <li>Once you submit your responses, it will be final.</li>
    </ul>
</div>

      <div className="max-w-4xl mx-auto p-6 relative z-10 pb-0 mb-0"> {/* Removed bottom padding */}
        
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
              <ReadabilityAssessment updateScores={updateScores}   markReadabilityComplete={markReadabilityComplete} />
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
              <WMCAssessment updateScoresWMC={updateScoresWMC} markWMCComplete={markWMCComplete} />
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
              <IPAssessment updateScoresIP={updateScoresIP}  markIPComplete={markIPComplete} />
            </div>
          )}
        </div>


        <button
    onClick={sendFormDataToBackend}
      // onClick={() => navigate('/thankyou')}
    className="bg-blue-500 hover:bg-blue-600 text-white  py-4 px-20 rounded text-2xl font-bold center w-full"
>
    Submit
</button>

      </div>
    </div>
  );
};

export default ThreeTests;