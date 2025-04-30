"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../utils/env");
/*
 * Function to generate a JWT token for a user
 * @param userID - The ID of the user for whom the token is generated
 * @returns A JWT token as a string
 * @throws Will throw an error if the token generation fails
 */
const generateToken = (userID) => {
    const token = jsonwebtoken_1.default.sign({
        id: userID,
    }, env_1.envVariables.JWT_SECRET_KEY, {
        expiresIn: "1h",
    });
    return token;
};
exports.generateToken = generateToken;
/*
 * Function to verify if a token is valid
 * @param token - The JWT token to be verified
 * @returns A boolean indicating whether the token is valid or not
 */
const isValidToken = (token) => {
    if (!token) {
        return false;
    }
    try {
        // verify the token using the secret key
        jsonwebtoken_1.default.verify(token, env_1.envVariables.JWT_SECRET_KEY);
        // check if the token is expired
        const decoded = jsonwebtoken_1.default.decode(token);
        const currentTime = Math.floor(Date.now() / 1000); // get current time in seconds
        if (decoded.exp < currentTime) {
            return false; // token is expired
        }
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.isValidToken = isValidToken;
