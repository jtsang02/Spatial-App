import { Request, Response } from "express"; // Import the express types

const express = require('express');
const router = express.Router();

router.get('/', async(req: Request, res: Response) => {
    try {
        res.send('welcome to the spatial api!');
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;