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
  },

  advanced: {
    cookiePrefix: "ssms",
  },

  trustedOrigins: ["http://172.20.110.45:3000", "http://ssms.gscwd.app"],

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
    autoSignIn: false,
  },

  plugins: [openAPI()],
});

export type Session = typeof auth.$Infer.Session;
