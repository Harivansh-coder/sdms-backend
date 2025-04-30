import { z } from "zod";

export const assignmentSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  partnerId: z.string().min(1, "Partner ID is required"),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).default("PENDING"),
});

export const assignmentUpdateSchema = z.object({
  orderId: z.string().optional(),
  partnerId: z.string().optional(),
  status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]).optional(),
});

export type Assignment = z.infer<typeof assignmentSchema>;
export type AssignmentUpdate = z.infer<typeof assignmentUpdateSchema>;
