// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import './index.css'; // Import Tailwind CSS
import LandingPage from "./pages/LandingPage";
import SurveyPage from "./pages/SurveyPage"; // Import your SurveyPage

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen"> {/* Ensure this uses flex and min height */}
        <Header />

        <main className="flex-grow"> {/* This allows main to take up available space */}
          <Routes>
            <Route path="/" element={<SurveyPage />} /> {/* Landing Page */}
            <Route path="/survey" element={<SurveyPage />} /> {/* Survey Page */}
          </Routes>
        </main>

        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
