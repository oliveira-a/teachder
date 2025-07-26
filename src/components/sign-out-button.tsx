'use client'

import { signOut } from "next-auth/react";
import { MouseEventHandler } from "react";

export function SignOut() {
    return (
        <button 
            className="text-neutral-950 hover:cursor-pointer p-2 bg-gray-600 rounded border-1 m-2 dark:bg-teal-950 text-neutral-300"
            onClick={() => signOut()}
        >
              Sign out
          </button>
    )
}