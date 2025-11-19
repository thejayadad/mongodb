// app/_components/google-btn.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FiLogOut } from "react-icons/fi";

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
  style={{
    backgroundColor: "#FFFFFF",
    color: "#111111",
    border: "1px solid #D6D6D6",
    padding: "8px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 500,
    cursor: loading ? "not-allowed" : "pointer",
    opacity: loading ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    transition: "all 0.2s ease",
  }}
  onMouseEnter={(e) => {
    if (!loading) e.currentTarget.style.backgroundColor = "#F3F3F3";
  }}
  onMouseLeave={(e) => {
    if (!loading) e.currentTarget.style.backgroundColor = "#FFFFFF";
  }}
>
  <FcGoogle size={20} />

  {loading ? "Redirecting..." : "Log in with Google"}
</button>
  )

  
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
      style={{
        backgroundColor: "#FFFFFF",
        color: "#111111",
        border: "1px solid #D6D6D6",
        padding: "8px 12px",
        borderRadius: "8px",
        fontSize: "12px",
        fontWeight: 500,
        cursor: loading ? "not-allowed" : "pointer",
        opacity: loading ? 0.6 : 1,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        if (!loading) e.currentTarget.style.backgroundColor = "#F3F3F3";
      }}
      onMouseLeave={(e) => {
        if (!loading) e.currentTarget.style.backgroundColor = "#FFFFFF";
      }}
    >
      <FiLogOut size={18} />

      {loading ? "Signing out..." : "Log out"}
    </button>
  );
}
