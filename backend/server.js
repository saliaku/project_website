const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors({
    origin: ['https://project-website-gray.vercel.app', 'https://project-website-gray.vercel.app/survey' , 'http://localhost:3000', ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // If cookies or auth headers are used
}));

// Add OPTIONS handling for preflight requests
app.options('*', cors()); // Enable pre-flight for all routes

// Test route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import and use your routes
const formRoutes = require('./routes/formRoutes');
app.use('/api/formdata', formRoutes);

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
