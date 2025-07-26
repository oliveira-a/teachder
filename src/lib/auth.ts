import { neon } from "@neondatabase/serverless";
import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        // todo: enventually pluck this out so we don't do it on every login
        const sql = neon(process.env.DATABASE_URL ?? "");
        const data =
          await sql`SELECT id FROM users WHERE email = ${user?.email}`;
        if (data.length !== 0) {
          token.id = data[0].id;
        } else {
          let data = await sql`INSERT INTO public.users (name, email)
              VALUES (${user.name}, ${user.email})`;
          data =
            await sql`SELECT id FROM users WHERE email = ${user?.email}`;
          token.id = data[0].id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
      }
      console.log('session', session)
      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl + "/dashboard";
    },
  },
};
