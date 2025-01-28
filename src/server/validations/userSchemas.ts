import { z } from "zod";

export const SignUpUserEmailSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  position: z.string().optional(),
  role: z.enum(["user", "support"]).optional().default("user"),
  office: z.string().min(1, "Office is required"),
  department: z.string().optional(),
  division: z.string().optional(),
  image: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const BulkUserAddSchema = z.object({
  users: z.array(SignUpUserEmailSchema),
});
