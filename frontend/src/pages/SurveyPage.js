import React, { useState } from 'react';
import ReadabilityAssessment from '../components/ReadabilityAssessment';
import WMCAssessment from '../components/WCAssessment';
import IPAssessment from '../components/IPAssessment';

const SurveyPage = () => {
  // State for user input fields
  const [formData, setFormData] = useState({
    name: '',
    school: '',
    rollNumber: '',
    fleschScore: '',
    ipScore: '',
    wmcScore: '',
  });

  // State for assessment metrics
  const [metrics, setMetrics] = useState({
    readabilityScore: 0,
    wmcScore: 0,
    ipScore: 0,
  });

  // State to control visibility for each section
  const [isReadabilityOpen, setReadabilityOpen] = useState(false);
  const [isWMCOpen, setWMCOpen] = useState(false);
  const [isIPOpen, setIPOpen] = useState(false);

  // Toggle functions for each section
  const toggleReadability = () => setReadabilityOpen(!isReadabilityOpen);
  const toggleWMC = () => setWMCOpen(!isWMCOpen);
  const toggleIP = () => setIPOpen(!isIPOpen);

  // // Prepare data for backend
  //   const dataToSend = {
  //     ...formData,
  //     ...calculatedMetrics,
  //   };

  // Function to update FLESCHscores
  const updateScores = (readabilityScore) => {
    setFormData((prev) => ({ ...prev, fleschScore: readabilityScore }));
    setMetrics((prev) => ({ ...prev, readabilityScore }));
  };

    // Function to update IPscores
    const updateScoresIP = (ipScore) => {
      setFormData((prev) => ({ ...prev, ipScore: ipScore }));
      setMetrics((prev) => ({ ...prev, ipScore }));
    };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* User Input Form */}
      <div className="mb-6">
        <label className="block mb-2">
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-2">
          School:
          <input
            type="text"
            name="school"
            value={formData.school}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
        <label className="block mb-4">
          Roll Number:
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </label>
      </div>

      {/* Readability Assessment Section */}
      <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
        <button
          className="w-full text-left px-6 py-4 bg-green-500 text-white font-semibold hover:bg-green-600 focus:outline-none"
          onClick={toggleReadability}
        >
          Readability Assessment
        </button>
        {isReadabilityOpen && (
          <div className="p-6 bg-gray-50">
            <ReadabilityAssessment updateScores={updateScores} />
          </div>
        )}
      </div>

      {/* WMCAssessment Section */}
      <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
        <button
          className="w-full text-left px-6 py-4 bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none"
          onClick={toggleWMC}
        >
          WMC Assessment
        </button>
        {isWMCOpen && (
          <div className="p-6 bg-gray-50">
            <WMCAssessment />
          </div>
        )}
      </div>

      {/* IPAssessment Section */}
      <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
        <button
          className="w-full text-left px-6 py-4 bg-indigo-500 text-white font-semibold hover:bg-indigo-600 focus:outline-none"
          onClick={toggleIP}
        >
          IP Assessment
        </button>
        {isIPOpen && (
          <div className="p-6 bg-gray-50">
            <IPAssessment updateScoresIP={updateScoresIP} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyPage;
