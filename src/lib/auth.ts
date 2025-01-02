import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./drizzle";
import { openAPI } from "better-auth/plugins";
import { account, session, user, verification } from "@ssms/server/db/schemas/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: user,
      session: session,
      account: account,
      verification: verification,
    },
  }),

  user: {
    additionalFields: {
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
  },

  advanced: {
    cookiePrefix: "ssms",
  },

  trustedOrigins: ["http://192.168.0.39:3000"],

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 1 * 60, // Cache duration in seconds
    },
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  plugins: [openAPI()],
});

export type Session = typeof auth.$Infer.Session;
