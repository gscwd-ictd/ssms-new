// types.ts
import { z } from "zod";

// Zod Schemas
export const CSVUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  position: z.string().nullable(), // nullish() allows null or undefined
  role: z.enum(["user", "support"]).default("user"),
  office: z.string().min(1, "Office is required"),
  department: z.string().nullable(),
  division: z.string().nullable(),
  image: z.string().nullable(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type CSVUser = z.infer<typeof CSVUserSchema>;

// Error types
export interface ValidationError {
  row: number;
  message: string;
}

export interface ImportResult {
  success: boolean;
  message: string;
  errors?: ValidationError[];
  importedCount?: number;
}

// Parser types
export interface CSVParseResult {
  data: CSVUser[];
  errors: ValidationError[];
}
