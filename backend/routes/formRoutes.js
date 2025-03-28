const express = require('express');
const router = express.Router();
const MoodleModel = require('../models/MoodleModel');

// Test route to check if API is working
router.get('/test', (req, res) => {
    res.json({ message: 'FormData route is working' });
});

// POST route to handle form submissions
router.post('/', async (req, res) => {
    try {
        // Log the incoming request data
        console.log('Received form data:', req.body);

        const missingFields = [];
    
        // Check each required field and collect the missing ones
        if (!req.body.name) missingFields.push('name');
        if (!req.body.school) missingFields.push('school');
        if (!req.body.rollNumber) missingFields.push('rollNumber');
        if (!req.body.userid) missingFields.push('userid');
        if (!req.body.fleschScore) missingFields.push('fleschScore');
        if (!req.body.ipScore) missingFields.push('ipScore');
        if (!req.body.wmcScore) missingFields.push('wmcScore');

        // Validate required fields
        if (missingFields.length > 0) {
            console.error('Missing required fields:', missingFields);
            // Send error response if required fields are missing
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

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
        });
    }
});

// Export the router
module.exports = router;