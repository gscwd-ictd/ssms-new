import { z } from "zod";

export const TeamAssignmentSchema = z.object({
  name: z.string(),
  users: z.preprocess((val) => {
    // If it's already an array, return as is
    if (Array.isArray(val)) return val;

    // If it's a string, convert to array
    if (typeof val === "string") return [val];

    // For any other type, return as is and let Zod handle validation
    return val;
  }, z.string().array()),
});

export const AddMemberSchema = z.object({
  users: z.preprocess((val) => {
    // If it's already an array, return as is
    if (Array.isArray(val)) return val;

    // If it's a string, convert to array
    if (typeof val === "string") return [val];

    // For any other type, return as is and let Zod handle validation
    return val;
  }, z.string().array()),
});
