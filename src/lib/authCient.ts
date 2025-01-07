import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          required: true,
          type: "string",
          fieldName: "role",
          defaultValue: "user",
        },
        office: {
          required: true,
          type: "string",
          fieldName: "office",
        },
        department: {
          required: true,
          type: "string",
          fieldName: "department",
        },
        division: {
          required: true,
          type: "string",
          fieldName: "division",
        },
      },
    }),
  ],
});
