// src/components/LandingPage.js
import React, { useState } from "react";
import Button from "../components/Button";
import UserInfo from "../components/UserInfo";

const LandingPage = () => {
  const [isFormComplete, setIsFormComplete] = useState(false);

  const handleFormComplete = (isComplete) => {
    setIsFormComplete(isComplete);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Welcome to My Landing Page</h1>

        {/* User Info section */}
        <UserInfo onFormComplete={handleFormComplete} />
        
        {/* Conditionally render the Proceed button based on form completion */}
        {isFormComplete && (
          <Button label="Proceed" to="/survey" className="mt-6" />
        )}
      </main>
    </div>
  );
};

export default LandingPage;
