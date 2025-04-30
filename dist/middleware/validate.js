"use strict";
// middleware to validate request body
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequestBody = (schema) => async (req, res, next) => {
    try {
        // validate request body
        req.body = await schema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            status: false,
            errors: {
                error: error.errors,
            },
        });
    }
};
exports.default = validateRequestBody;
