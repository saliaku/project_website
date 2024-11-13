import React, { useState, useEffect, useRef } from 'react';
import ReadabilityAssessment from '../components/ReadabilityAssessment';
import WMCAssessment from '../components/WCAssessment';
import IPAssessment from '../components/IPAssessment';
import "../index.css"; // Import your Tailwind CSS
import axios from 'axios'; // Import axios if you're using it



const SurveyPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    rollNumber: '',
    fleschScore: '',
    ipScore: '',
    wmcScore: '',
  });

  const sendFormDataToBackend = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/formdata', formData);

        console.log('Response from backend:', response.data);
        alert('Form data sent successfully!');
    } catch (error) {
        console.error('Error sending form data:', error);
        alert('Failed to send form data.');
    }
};

  console.log(formData);

  const [metrics, setMetrics] = useState({
    readabilityScore: 0,
    wmcScore: 0,
    ipScore: 0,
  });

  const [isReadabilityOpen, setReadabilityOpen] = useState(false);
  const [isWMCOpen, setWMCOpen] = useState(false);
  const [isIPOpen, setIPOpen] = useState(false);

  const toggleReadability = () => setReadabilityOpen(!isReadabilityOpen);
  const toggleWMC = () => setWMCOpen(!isWMCOpen);
  const toggleIP = () => setIPOpen(!isIPOpen);

  const updateScores = (readabilityScore) => {
    setFormData((prev) => ({ ...prev, fleschScore: readabilityScore }));
    setMetrics((prev) => ({ ...prev, readabilityScore }));
  };

  const updateScoresIP = (ipScore) => {
    setFormData((prev) => ({ ...prev, ipScore: ipScore }));
    setMetrics((prev) => ({ ...prev, ipScore }));
  };

  const updateScoresWMC = (wmcScore) => {
    setFormData((prev) => ({ ...prev, wmcScore: wmcScore }));
    setMetrics((prev) => ({ ...prev, wmcScore }));
  };
  
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
    <div className="relative bg-gradient-to-br from-indigo-900 via-blue-700 to-violet-800 overflow-hidden min-h-screen pb-0 mb-0">
      <div ref={starContainerRef} className="absolute inset-0 bg-stars overflow-hidden"></div>

      <div className="max-w-4xl mx-auto p-6 relative z-10 pb-0 mb-0"> {/* Removed bottom padding */}
        <div className="space-y-6">
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
        </div>

        <div className="bg-gradient-to-r from-green-400 to-teal-500 shadow-md rounded-lg mb-4 overflow-hidden">
          <button
            className="w-full text-left px-6 py-4 font-semibold hover:bg-green-600 focus:outline-none"
            onClick={toggleReadability}
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
            onClick={toggleWMC}
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
            onClick={toggleIP}
          >
            IP Assessment
          </button>
          {isIPOpen && (
            <div className="p-6 bg-gray-50 rounded-b-lg">
              <IPAssessment updateScoresIP={updateScoresIP} />
            </div>
          )}
        </div>

        <button
    onClick={sendFormDataToBackend}
    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
>
    Submit Form Data
</button>

      </div>
    </div>
  );
};

export default SurveyPage;
