import { clsx, type ClassValue } from "clsx"
import { getServerSession, Session } from "next-auth"
import { twMerge } from "tailwind-merge"
import { authOptions } from "./auth"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getUserEmail(): Promise<string> {
  const session = await getServerSession(authOptions)

  return session?.user?.email ?? ""
}