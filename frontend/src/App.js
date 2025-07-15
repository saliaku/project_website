// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import LoadingScreen from "./pages/LoadingScreen";
import SurveyPage from "./pages/SurveyPage";
import CviTest from "./components/CviTest";
import ThreeTests from "./components/ThreeTests";
import ThankYou from "./components/ThankYou";
import ReadabilityAssessment from "./components/ReadabilityAssessment";
import IPAssessment from "./components/IPAssessment";
import WMCAssessment from "./components/WCAssessment";

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {!loadingComplete ? (
          <LoadingScreen setLoadingComplete={setLoadingComplete} />
        ) : (
          <>
            <Header />
            <main className="flex-grow">
      
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/survey" element={<SurveyPage />} />
                <Route path="/visual_perception_test" element={<CviTest />} />

                <Route path="/readability_test" element={<ReadabilityAssessment/>} />
                <Route path="/ip_test" element={<IPAssessment/>} />
                <Route path="/wmc_test" element={<WMCAssessment/>} />

                <Route path="/three_tests" element={<ThreeTests />} />
                <Route path="/thankyou" element={<ThankYou />} />
              </Routes>
        
            </main>
            <Footer />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
