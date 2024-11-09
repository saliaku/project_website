const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


const User = require('./models/User');

app.post('/api/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

