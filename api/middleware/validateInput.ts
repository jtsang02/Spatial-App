import { Request, Response, NextFunction } from 'express';
import Ajv from 'ajv';

const ajv = new Ajv();

// define the validation schema
const inputParamsSchema = {
    type: "object",
    properties: {
        h: { type: "number" },
        w: { type: "number" },
        LD: { type: "number" },
        actOpns: { type: "number" },
        sprk: { type: "boolean" },
        group: { type: "string" }
    },
    required: ["h", "w", "LD", "sprk", "group"],
    additionalProperties: false
};

const validateInputParams = (req: Request, res: Response, next: NextFunction) => {
    // validate the request body against the schema
    const valid = ajv.validate(inputParamsSchema, req.body);
    if (!valid) {
        const errorMessages = ajv.errors?.map(error => error.message) ?? [];
        return res.status(400).json({ errors: errorMessages });
    }
    
    // validate that the height and width are greater than zero
    if (req.body.h <= 0 && req.body.w <= 0) {
        return res.status(400).json({ errors: ["Height and width must be greater than zero."] });
    }
    if (req.body.h <= 0) {
        return res.status(400).json({ errors: ["Height must be greater than zero."] });
    }
    if (req.body.w <= 0) {
        return res.status(400).json({ errors: ["Width must be greater than zero."] });
    }

    // validate that the actual openings is not greater than the area
    if (req.body.actOpns > req.body.h * req.body.w) {
        return res.status(400).json({ errors: ["Actual openings cannot be greater than the area."] });
    }

    next();
};

export default validateInputParams;
