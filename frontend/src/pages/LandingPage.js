// src/components/LandingPage.js
import React from "react";
import Button from "../components/Button";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome to My Landing Page</h1>
        
        <div className="flex space-x-4">
          <Button label="Admin" to="/" /> {/* Pass route for Admin button */}
          <Button label="User" to="/survey" />  {/* Pass route for User button */}
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
