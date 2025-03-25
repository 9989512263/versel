const express = require('express');
const dbConfig = require('./dbconfig');
const router = require('./router');  // Make sure this is correctly imported

const app = express();
const PORT = 5000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to the database
dbConfig();

// Use the router for handling API requests (prefix with '/api')

app.use('/api', router);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
