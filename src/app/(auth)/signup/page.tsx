"use client";

import { ErrorContext } from "@better-fetch/fetch";
import { authClient } from "@ssms/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const router = useRouter();

  const signUp = async () => {
    await authClient.signUp.email(
      {
        email,
        password,
        name,
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
      <div className="flex flex-col">
        <div className="flex flex-col">
          <input
            type="name"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-2"
          />
          <input
            type="email"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2"
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border px-3 py-2"
          />
        </div>
        <button onClick={signUp}>Sign Up</button>
      </div>
    </div>
  );
}
