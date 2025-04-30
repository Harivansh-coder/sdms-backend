"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partnerUpdateSchema = exports.partnerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// Define a zod schema for the auth request object
exports.partnerSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required"),
    email: zod_1.default.string().email(),
    phone: zod_1.default.string(),
    status: zod_1.default.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
    currentLoad: zod_1.default.number().int().default(0),
    areas: zod_1.default.array(zod_1.default.string()),
    shiftStart: zod_1.default.string(), // Assuming shiftStart can be a string or null
    shiftEnd: zod_1.default.string(), // Assuming shiftEnd can be a string or null
});
exports.partnerUpdateSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Name is required").optional(),
    email: zod_1.default.string().email().optional(),
    phone: zod_1.default.string().optional(),
    status: zod_1.default.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE").optional(),
    currentLoad: zod_1.default.number().int().default(0).optional(),
    areas: zod_1.default.array(zod_1.default.string()).optional(),
    shiftStart: zod_1.default.string().optional(), // Assuming shiftStart can be a string or null
    shiftEnd: zod_1.default.string().optional(), // Assuming shiftEnd can be a string or null
});
