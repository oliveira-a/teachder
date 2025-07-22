'use client'

import { signIn } from "next-auth/react";

export function Login() {
  return <button onClick={() => signIn("github")}>Sign in with GitHub</button>;
}
