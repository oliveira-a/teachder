'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()}>
            Sign out
        </button>
      </>
    );
  }

  return <button onClick={() => signIn("github")}>Sign in with GitHub</button>;
}

