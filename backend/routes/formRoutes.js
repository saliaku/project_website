const express = require('express');
const router = express.Router();
const FormData = require('../models/FormData'); // Import your model

// POST route to handle form submissions
router.post('/', async (req, res) => {
    try {
        const formData = new FormData(req.body);
        await formData.save();
        res.status(201).json(formData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
