const express = require('express');
const axios = require("axios");
const router = express.Router();
const MoodleModel = require('../models/MoodleModel');
const connectDB = require('../config/db');


// Test route to check if API is working
router.get('/test', (req, res) => {
    res.json({ message: 'FormData route is working' });
});

// POST route to handle form submissions
router.post('/', async (req, res) => {
    try {
        // Log the incoming request data
        console.log('Received form data:', req.body);


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
        });connectDB
    }

    try {
        const { userid, cmid, fleschScore, ipScore, wmcScore } = req.body;

    
        // Update the mdl_user table with the new assessment scores
        const updateQuery = `
            UPDATE mdl_user 
            SET 
                flesch = ?, 
                ipv = ?, 
                ipa = ?, 
                ipt = ?, 
                wmv = ?, 
                wma = ?, 
                wmt = ?,
                v = ?,
                a = ?,
                t = ?,
                auditoryIssue = ?,
                visualIssue = ?,
                cviScore = ?,
                totalClicks = ?,
                wrongSelect = ?,
                quadrantCode = ?
            WHERE id = ?;
        `;
    
        const db = await connectDB(); // Ensure database connection is established
        await db.query(updateQuery, [
            
            fleschScore,
            ipScore.image,
            ipScore.audio,
            ipScore.text,
            wmcScore.image,
            wmcScore.audio,
            wmcScore.text,
            vatScore.v,
            vatScore.a,
            vatScore.t,
            auditoryIssue,
            visualIssue,
            cviScore.finalScore,
            cviScore.totalClicks,
            cviScore.wrongSelect,
            cviScore.finalQuadrantCode,
            
            userid // `id` in `mdl_user` represents the user
        ]);
    
        // Update the mdl_user table with the new assessment scores
        // const currentTimestamp = Math.floor(Date.now() / 1000);
        // const insertQuery = `
        // INSERT INTO mdl_course_modules_completion (
        //     id,              
        //     coursemoduleid,  
        //     userid,          
        //     completionstate, 
        //     timemodified     
        // ) 
        // VALUES (NULL, ?, ?, 1, ?);
        // `;

        // await db.query(insertQuery, [
        //     cmid, userid, currentTimestamp
        // ]);


    } catch (error) {
        console.error("Error updating Moodle quiz status:", error);
        res.status(500).json({ error: "Failed to update quiz status in Moodle" });
    }

    
});

// Export the router
module.exports = router;