import Compartment from "../calculation/Compartment";
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
            actualOpenings: compartment.areaOfOpenings.toFixed(2),
            unprotectedOpenings: compartment.unprotectedOpenings.toFixed(2),
            frr: compartment.frr,
            construction: compartment.construction,
            cladding: compartment.cladding
        };
        res.status(200).json(resObj);
    } catch (error) {
        console.error(error);
    }
});

// put request to update a compartment
// router.put('/', async(req: any, res: any) => {
//     try {
//         res.send('update a compartment');
//     } catch (error) {
//         console.error(error);
//     }
// });

// delete request to delete a compartment
// router.delete('/', async(req: any, res: any) => {
//     try {
//         res.send('delete a compartment ');
//     } catch (error) {
//         console.error(error);
//     }
// });

module.exports = router;