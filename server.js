const express = require('express');
const dbConfig = require('./dbconfig');
const router = require('./router');  // Make sure this is correctly imported
const cors = require('cors'); 
const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
dbConfig();

// Use the router for handling API requests (prefix with '/api')
app.use(cors());

// or if you want to allow only specific origins:
app.use(cors({
    origin: 'http://localhost:5173', // Adjust the origin according to your front-end URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
