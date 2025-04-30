import z from "zod";

// Define a zod schema for the auth request object
export const partnerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  phone: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
  currentLoad: z.number().int().default(0),
  areas: z.array(z.string()),
  shiftStart: z.string(), // Assuming shiftStart can be a string or null
  shiftEnd: z.string(), // Assuming shiftEnd can be a string or null
});

export const partnerUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE").optional(),
  currentLoad: z.number().int().default(0).optional(),
  areas: z.array(z.string()).optional(),
  shiftStart: z.string().optional(), // Assuming shiftStart can be a string or null
  shiftEnd: z.string().optional(), // Assuming shiftEnd can be a string or null
});
