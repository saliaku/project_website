// src/pages/SurveyPage.js
import React, { useState } from 'react';
import ReadabilityAssessment from '../components/ReadabilityAssessment';
import WMCAssessment from '../components/WCAssessment';
import IPAssessment from '../components/IPAssessment';

const SurveyPage = () => {
  

  return (
    <>
    <ReadabilityAssessment />
    <WMCAssessment />
    <IPAssessment />
    </>
);
};

export default SurveyPage;
