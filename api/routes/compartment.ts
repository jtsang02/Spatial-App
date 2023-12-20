import Compartment from "../calculation/Compartment";

const express = require('express');
const router = express.Router();

// get request to retrieve data from a compartment
router.get('/', async(req: any, res: any) => {
    try {  
        let compartment = new Compartment(10, 5, 5, 14, false, "E");
        let unprotectedOpenings = compartment.unprotectedOpenings;
        res.status(200).json({ unprotectedOpenings });
    } catch (error) {
        console.error(error);
    }
});

// post request to create a new compartment
// router.post('/', async(req: any, res: any) => {
//     try {
//         res.send('create a new compartment on the future MongoDB');
//     } catch (error) {
//         console.error(error);
//     }
// });

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