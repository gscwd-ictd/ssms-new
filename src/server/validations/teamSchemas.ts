import { z } from "zod";

export const TeamAssignmentSchema = z.object({
  name: z.string(),
  users: z.array(z.string()),
});
