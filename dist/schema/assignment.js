"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignmentUpdateSchema = exports.assignmentSchema = void 0;
const zod_1 = require("zod");
exports.assignmentSchema = zod_1.z.object({
    orderId: zod_1.z.string().min(1, "Order ID is required"),
    partnerId: zod_1.z.string().min(1, "Partner ID is required"),
    status: zod_1.z.enum(["PENDING", "ACCEPTED", "REJECTED"]).default("PENDING"),
});
exports.assignmentUpdateSchema = zod_1.z.object({
    orderId: zod_1.z.string().optional(),
    partnerId: zod_1.z.string().optional(),
    status: zod_1.z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
});
