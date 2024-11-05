import React, { useState } from 'react';
import ReadabilityAssessment from '../components/ReadabilityAssessment';
import WMCAssessment from '../components/WCAssessment';
import IPAssessment from '../components/IPAssessment';

const SurveyPage = () => {
  // State to control visibility for each section
  const [isReadabilityOpen, setReadabilityOpen] = useState(false);
  const [isWMCOpen, setWMCOpen] = useState(false);
  const [isIPOpen, setIPOpen] = useState(false);

  // Toggle functions for each section
  const toggleReadability = () => setReadabilityOpen(!isReadabilityOpen);
  const toggleWMC = () => setWMCOpen(!isWMCOpen);
  const toggleIP = () => setIPOpen(!isIPOpen);

  return (
    <div className="max-w-4xl mx-auto p-6">
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
            <ReadabilityAssessment />
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
            <IPAssessment />
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyPage;
