const express = require('express');
const Example = require('../models/ExampleModel');
const router = express.Router();

// Create example route for adding a document
router.post('/add', async (req, res) => {
  try {
    const example = new Example(req.body);
    await example.save();
    res.status(201).json(example);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add example' });
  }
});

// Example route for fetching documents
router.get('/', async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch examples' });
  }
});

module.exports = router;
