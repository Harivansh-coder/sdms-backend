"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("@/src/controllers/auth");
const validate_1 = __importDefault(require("@/src/middleware/validate"));
const auth_2 = require("@/src/schema/auth");
const auth_3 = require("@/src/middleware/auth");
const authRouter = (0, express_1.Router)();
// login route
authRouter.post("/login", (0, validate_1.default)(auth_2.loginSchema), auth_1.loginController);
// signup route
authRouter.post("/signup", (0, validate_1.default)(auth_2.signupSchema), auth_1.signupController);
// get current logged in user route
authRouter.get("/me", auth_3.verifyAccessToken, auth_1.getCurrentUserController);
exports.default = authRouter;
