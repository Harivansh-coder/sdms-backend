"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envVariables = void 0;
const zod_1 = require("zod");
const dotenv_1 = __importDefault(require("dotenv"));
// Load the .env file
dotenv_1.default.config();
// Define the schema for the .env file
const envSchema = zod_1.z.object({
    PORT: zod_1.z
        .string()
        .default("3000")
        .transform((val) => parseInt(val)),
    DATABASE_URL: zod_1.z.string().trim(),
    NODE_ENV: zod_1.z.enum(["development", "production"]).default("development"),
    JWT_SECRET_KEY: zod_1.z.string().trim(),
});
// Validate the .env file
const env = envSchema.safeParse(process.env);
if (!env.success) {
    throw new Error(env.error.errors[0].message);
}
exports.envVariables = env.data;
