import Compartment from "../calculation/Compartment";
import roundNum from "../calculation/roundNum";
import { Request, Response } from "express"; // Import the express types
import validateInputParams from "../middleware/validateInput";

const express = require('express');
const router = express.Router();

// post request to calculate the compartment
router.post('/', validateInputParams, async(req: Request, res: Response) => {
    try {
        // destructuring the request body
        const { h, w, LD, actOpns, sprk, group } = req.body;

        // create a compartment object
        let compartment = new Compartment(h, w, LD, actOpns, sprk, group);        
        let resObj = {
            actualOpenings: roundNum(compartment.areaOfOpenings, 2),
            unprotectedOpenings: roundNum(compartment.unprotectedOpenings, 2),
            frr: compartment.frr,
            construction: compartment.construction,
            cladding: compartment.cladding
        };
        res.status(200).json(resObj);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;