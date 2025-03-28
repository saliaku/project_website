const express = require('express');
const axios = require("axios");
const router = express.Router();
const MoodleModel = require('../models/MoodleModel');
const mysql = require("mysql2/promise"); // Using MySQL2 with async/await
const connectDB = require('./config/db');
const { connection } = require('mongoose');



// Test route to check if API is working
router.get('/test', (req, res) => {
    res.json({ message: 'FormData route is working' });
});

// POST route to handle form submissions
router.post('/', async (req, res) => {
    try {
        // Log the incoming request data
        console.log('Received form data:', req.body);
        const { userid, cmid, fleschScore, ipScore, wmcScore } = req.body;
        const missingFields = [];
        const MOODLE_URL = "https://144.24.155.112/moodle/webservice/rest/server.php";
        const MOODLE_API_TOKEN = "594ba42e18befd7b6de28ea5e156ed7";
    
    
        // Create new form data instance
        const moodleModel = new MoodleModel(req.body);

        console.log('Using model:', MoodleModel.modelName);


        // Save to database
        const savedData = await moodleModel.save();
        console.log('Successfully saved form data:', savedData);

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Form data saved successfully',
            data: savedData
        });


        try {


             // Insert user data into the mod_user table
            const insertQuery = `
            UPDATE mod_user 
            SET 
                flesch = ?,
                ipv = ?,
                ipa = ?,
                ipt = ?,
                wmv = ?,
                wma = ?,
                wmt = ?
            WHERE userid = ?;
                    `;

            const connection = await connectDB();
            await db.query(insertQuery, [               
                fleschScore,          
                ipScore.image,        
                ipScore.audio,        
                ipScore.text,         
                wmcScore.image,      
                wmcScore.audio,       
                wmcScore.text,
                userid         
            ]);


            const response = await axios.post(MOODLE_URL, null, {
                params: {
                    wstoken: MOODLE_API_TOKEN,
                    wsfunction: "core_completion_update_activity_completion_status_manually",
                    moodlewsrestformat: "json",
                    cmid,
                    completed: 1,
                    userid
                },
            });
    
            res.json(response.data);
        } catch (error) {
            console.error("Error updating Moodle quiz status:", error);
            res.status(500).json({ error: "Failed to update quiz status in Moodle" });
        }

    } catch (error) {
        // Log the error for debugging
        console.error('Error in form submission:', error);

        // Handle MongoDB validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: Object.values(error.errors).map(err => err.message)
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: 'Server error while saving form data',
            error: error.message
        });
    }
});

// Export the router
module.exports = router;