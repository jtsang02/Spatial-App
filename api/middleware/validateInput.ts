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
    required: ["h", "w", "LD", "actOpns", "sprk", "group"],
    additionalProperties: false
};

// validate the request body against the schema
const validateInputParams = (req: Request, res: Response, next: NextFunction) => {
    const valid = ajv.validate(inputParamsSchema, req.body);
    if (!valid) {
        const errorMessages = ajv.errors?.map(error => error.message) ?? [];
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};

export default validateInputParams;
