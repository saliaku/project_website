// src/components/UserInfo.js
import React, { useState, useEffect } from 'react';

const UserInfo = ({ onFormComplete }) => {
    const [formData, setFormData] = useState({
        username: '',
        schoolName: '',
        age: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Track whether all form fields are filled
    useEffect(() => {
        // Call the onFormComplete function when the form is completely filled
        const isComplete = formData.username && formData.schoolName && formData.age;
        onFormComplete(isComplete);
    }, [formData, onFormComplete]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // You can add further form submission logic here
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">User Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="schoolName">School Name:</label>
                    <input
                        type="text"
                        name="schoolName"
                        id="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="age">Age:</label>
                    <input
                        type="number"
                        name="age"
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </form>
        </div>
    );
};

export default UserInfo;
