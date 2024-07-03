// Import required modules
const express = require('express');
const morgan = require('morgan');  
const bodyParser = require('body-parser'); 

// Create an Express application
const app = express();

// Middleware: Logging incoming requests
app.use(morgan('dev'));

// Middleware: Parse incoming request bodies
app.use(bodyParser.json());

// Basic routes
app.get('/', (req, res) => {
  res.send('Welcome to my Express server!');
});

app.get('/about', (req, res) => {
  res.send('This is a basic Express server with middleware.');
});

// Handle non-existent routes
app.use((req, res, next) => {
  const error = new Error('404 Not Found');
  error.status = 404;
  next(error);
});

// Error handler middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
