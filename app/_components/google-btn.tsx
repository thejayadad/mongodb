// app/_components/google-btn.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function SignInWithGoogleButton() {
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      // Better Auth client: social sign-in with Google
      await authClient.signIn.social({ provider: "google" });
      // Redirect happens via the OAuth flow
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onLogin}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-neutral-300 px-4 py-2 rounded-lg font-medium disabled:opacity-50"
    >
      {loading ? "Redirecting..." : "Log in with Google"}
    </button>
  );
}

export function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onLogout = async () => {
    try {
      setLoading(true);
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
        },
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={onLogout}
      disabled={loading}
      className="bg-red-600 hover:bg-red-700 text-neutral-600 px-3 py-2 rounded-lg font-medium disabled:opacity-50"
    >
      {loading ? "Signing out..." : "Log out"}
    </button>
  );
}
