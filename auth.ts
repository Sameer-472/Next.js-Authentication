import { PrismaAdapter } from "@auth/prisma-adapter"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import NextAuth, { type DefaultSession } from "next-auth";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";


// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   providers: [GitHub],
// })

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      role: "admin" | "user"

    } & DefaultSession["user"]
  }
  interface SignIn {
    user: {
      id: string

    } & DefaultSession["user"]
  }
}
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await getUserById(user.id);
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnable) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        if (!twoFactorConfirmation) return false;
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })

        return true
      }
      return true;


    },
    async jwt({ token }) {
      console.log({ token: token })
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token
      return token
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      console.log({ sessionToken: token })
      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" }, // not using database session strategy
  secret: process.env.AUTH_SECRET,
  ...authConfig
})