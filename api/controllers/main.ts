import main from "../services/main";

const express = require('express');
const router = express.Router();

router.get('/', main)

module.exports = router;