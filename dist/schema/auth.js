"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupSchema = exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// Define a zod schema for the auth request object
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8, "Password must be at least 8 characters long"),
});
exports.signupSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8, "Password must be at least 8 characters long"),
});
