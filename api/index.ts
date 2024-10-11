import express from 'express';

const app = express();
const cors = require('cors');
const port = 3000;

// Middleware to parse the request body as JSON
app.use(cors());
app.use(express.json());

// Import routes
const compartment = require('./controllers/compartment');

// Register routes
app.use('/calculate', compartment);  // Handles POST /calculate

// Start the local server
app.listen(port, '0.0.0.0', () => {
    console.log('The application is listening on http://localhost:3000');
});

export default app;