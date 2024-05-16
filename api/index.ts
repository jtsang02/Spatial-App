import express from 'express';

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const url = ''; // future MongoDB URL

// Connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB!');
    } catch (error) {
        console.error(error);
    }
}

// connect();   // uncomment this line if you want to connect to MongoDB

// Middleware to parse the request body as JSON
app.use(cors());
app.use(express.json());

// Routes
const main = require('./controllers/main');
const compartment = require('./controllers/compartment');
app.use('/', main);
app.use('/calculate', compartment);  

// Start the server
app.listen(3000, '0.0.0.0', () => {
    console.log('The application is listening on http://localhost:3000');
});