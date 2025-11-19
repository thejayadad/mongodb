// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // leave baseURL empty when frontend + API share the same origin
  // baseURL: "http://localhost:3000", // optional
});
