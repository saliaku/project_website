import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NoTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const incomingFormData = location.state || {};

  const [formData, setFormData] = useState({
    ...incomingFormData,
  });


    const sendFormDataToBackend = async () => {
           
    // navigate('/thankyou');
    
    try {

        // Log the data being sent
        console.log('Sending form data to backend- for both auditory & visual issue:', formData);

        const response = await axios.post(
            'https://kailas.kattangal.online/api/formdata',
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
            // alert('Form data sent successfully!');
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

 const starContainerRef = useRef(null);
  
    useEffect(() => {
      const numStars = 50;
      const container = starContainerRef.current;
        if (!container) return;

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
  <div className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 overflow-hidden min-h-screen">
    <div ref={starContainerRef} className="absolute inset-0 bg-stars overflow-hidden"></div>

    <div className="relative z-10 flex items-center justify-center min-h-screen">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold">No Applicable Tests</h1>
        <p className="text-xl mt-4">You may skip this section.</p>
        <button
          onClick={sendFormDataToBackend}
          className="mt-6 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
);

};

export default NoTest;
