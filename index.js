// Import the 'express' package, which is a web application framework for Node.js
const express = require('express');

// Import the 'body-parser' package, which is a middleware for parsing incoming request bodies
const bodyParser = require('body-parser');

// Create an instance of the Express application
const app = express();

// Use the 'body-parser' middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define a GET route
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
  });
  
  // Define a POST route
  app.post('/api/user', (req, res) => {
    // Logic to create a new user
    res.json({ message: 'User created successfully' });
  });

// Define the port number to listen on. If there's an environment variable named 'PORT', use its value. Otherwise, default to port 3000.
const port = process.env.PORT || 3000;

// Start the server and make it listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
