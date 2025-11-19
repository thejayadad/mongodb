// lib/auth.ts
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { client, db } from "./mongodb-client";

export const auth = betterAuth({
  appName: "Board Demo",

  database: mongodbAdapter(db, {
    client, // MongoClient for your Atlas cluster
  }),

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // optional but nice:
      // prompt: "select_account",
    },
  },

  plugins: [
    nextCookies(), // makes cookies work nicely with Next server actions/RSC
  ],
});
