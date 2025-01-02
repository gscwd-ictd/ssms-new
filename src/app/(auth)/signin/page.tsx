"use client";

import { ErrorContext } from "@better-fetch/fetch";
import { authClient } from "@ssms/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleCredentialsSignIn = async () => {
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: async () => {
          router.push("/dashboard");
          router.refresh();
        },
        onError: (ctx: ErrorContext) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col space-y-4">
        <div className="space-y-2 flex flex-col">
          <input
            defaultValue={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            className="border px-3 py-2"
          />
          <input
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="border px-3 py-2"
          />
        </div>
        <button
          className="bg-indigo-500 text-white py-2"
          onClick={async () => {
            await handleCredentialsSignIn();
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
