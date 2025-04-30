"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderUpdateSchema = exports.orderSchema = void 0;
const zod_1 = __importDefault(require("zod"));
// Define a zod schema for the auth request object
exports.orderSchema = zod_1.default.object({
    orderNumber: zod_1.default.string().min(1, "Order number is required"),
    customerName: zod_1.default.string().min(1, "Customer name is required"),
    customerPhone: zod_1.default.string().min(1, "Customer phone is required"),
    customerAddr: zod_1.default.string().min(1, "Customer address is required"),
    area: zod_1.default.string().min(1, "Area is required"),
    items: zod_1.default.object({}).default({}), // Assuming items can be an object or null
    status: zod_1.default
        .enum(["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
        .default("PENDING"),
    scheduledFor: zod_1.default.string(), // Assuming scheduledFor can be a string or null
    assignedTo: zod_1.default.string().optional(), // Assuming assignedTo can be a string or null
    assignedAt: zod_1.default.string().optional(), // Assuming assignedAt can be a string or null
    deliveredAt: zod_1.default.string().optional(), // Assuming deliveredAt can be a string or null
    totalAmount: zod_1.default.number().min(0, "Total amount must be a positive number"),
});
// a complete optional schema for the update request object
exports.orderUpdateSchema = zod_1.default.object({
    orderNumber: zod_1.default.string().optional(),
    customerName: zod_1.default.string().optional(),
    customerPhone: zod_1.default.string().optional(),
    customerAddr: zod_1.default.string().optional(),
    area: zod_1.default.string().optional(),
    items: zod_1.default.object({}).default({}), // Assuming items can be an object or null
    status: zod_1.default
        .enum(["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
        .optional(),
    scheduledFor: zod_1.default.string().optional(), // Assuming scheduledFor can be a string or null
    assignedTo: zod_1.default.string().optional(), // Assuming assignedTo can be a string or null
    assignedAt: zod_1.default.string().optional(), // Assuming assignedAt can be a string or null
    deliveredAt: zod_1.default.string().optional(), // Assuming deliveredAt can be a string or null
    totalAmount: zod_1.default
        .number()
        .min(0, "Total amount must be a positive number")
        .optional(),
});
