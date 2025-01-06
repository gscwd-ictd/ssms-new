import { z } from "zod";

export const OfficeSchema = z.object({
  name: z.string(),
});

export const DepartmentSchema = z.object({
  name: z.string(),
  officeId: z.string().min(28),
});

export const DivisionSchema = z.object({
  name: z.string(),
  departmentId: z.string().min(28),
});
