'use client'

import { signIn } from "next-auth/react";

export function Login() {
    return (
        <>
        <button 
            className="text-neutral-950 hover:cursor-pointer p-2 bg-gray-600 rounded border-1 m-2 dark:bg-teal-950 text-neutral-300"
            onClick={() => signIn("github")}
        >
              Sign in with GitHub
          </button>
      </>
  );
}
