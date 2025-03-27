const express = require('express');
const router = express.Router();
const FormData = require('../models/Moodle_Model');

// Test route to check if API is working
router.get('/test', (req, res) => {
    res.json({ message: 'FormData route is working' });
});

// POST route to handle form submissions
router.post('/', async (req, res) => {
    try {
        // Log the incoming request data
        console.log('Received form data:', req.body);

        // Validate required fields
        if (!req.body.name || !req.body.school || !req.body.rollNumber || !req.body.userid) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: name, school, or rollNumber'
            });
        }

        // Create new form data instance
        const formData = new FormData(req.body);

        // Save to database
        const savedData = await formData.save();
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