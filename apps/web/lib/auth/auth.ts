import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { organization } from "better-auth/plugins";
import { prisma } from "@/lib/db/prisma";
import { sendInvitationEmail } from "@/lib/email/send-invitation";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    disableSignUp: isProduction,
  },
  experimental: { joins: true },
  plugins: [
    organization({
      allowUserToCreateOrganization: false,
      sendInvitationEmail,
      invitationExpiresIn: 60 * 60 * 24 * 7,
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
