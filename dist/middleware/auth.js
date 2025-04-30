"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("@/src/utils/env");
const verifyAccessToken = (req, res, next) => {
    // Get access token from header
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    // if access token does not exist, return 401 error
    if (!accessToken) {
        res.status(401).send({
            status: false,
            errors: {
                message: "Unauthorized",
            },
        });
        return;
    }
    jsonwebtoken_1.default.verify(accessToken, env_1.envVariables.JWT_SECRET_KEY, (err, decoded) => {
        if (err || !decoded) {
            res.status(401).send({
                status: false,
                errors: {
                    message: "unauthorized or invalid token",
                },
            });
            return;
        }
        // Cast decoded payload to JWTPayload type
        const jwtPayload = decoded;
        // Attach the user id to the request user object
        req.user = { id: jwtPayload.id };
        next(); // Pass control to the next middleware/handler
    });
};
exports.verifyAccessToken = verifyAccessToken;
