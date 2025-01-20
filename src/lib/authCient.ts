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
        position: {
          required: false,
          type: "string",
          fieldName: "position",
        },
        office: {
          required: true,
          type: "string",
          fieldName: "office",
        },
        department: {
          required: false,
          type: "string",
          fieldName: "department",
        },
        division: {
          required: false,
          type: "string",
          fieldName: "division",
        },
      },
    }),
  ],
});
