import z from "zod";

// Define a zod schema for the auth request object
export const orderSchema = z.object({
  orderNumber: z.string().min(1, "Order number is required"),
  customerName: z.string().min(1, "Customer name is required"),
  customerPhone: z.string().min(1, "Customer phone is required"),
  customerAddr: z.string().min(1, "Customer address is required"),
  area: z.string().min(1, "Area is required"),
  items: z.object({}).default({}), // Assuming items can be an object or null
  status: z
    .enum(["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .default("PENDING"),
  scheduledFor: z.string(), // Assuming scheduledFor can be a string or null
  assignedTo: z.string().optional(), // Assuming assignedTo can be a string or null
  assignedAt: z.string().optional(), // Assuming assignedAt can be a string or null
  deliveredAt: z.string().optional(), // Assuming deliveredAt can be a string or null
  totalAmount: z.number().min(0, "Total amount must be a positive number"),
});

// a complete optional schema for the update request object
export const orderUpdateSchema = z.object({
  orderNumber: z.string().optional(),
  customerName: z.string().optional(),
  customerPhone: z.string().optional(),
  customerAddr: z.string().optional(),
  area: z.string().optional(),
  items: z.object({}).default({}), // Assuming items can be an object or null
  status: z
    .enum(["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .optional(),
  totalAmount: z
    .number()
    .min(0, "Total amount must be a positive number")
    .optional(),
});

export type Order = z.infer<typeof orderSchema>;
