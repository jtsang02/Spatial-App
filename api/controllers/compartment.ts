import validateInputParams from "../services/validateInput";
import calculate from "../services/calculate";

const express = require('express');
const router = express.Router();

// post request to calculate the compartment
router.post('/', validateInputParams, calculate);

module.exports = router;    // comment out for serverless deployment