import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import { db } from "./lib/db"
import { getUserById } from "./data/user"


// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   providers: [GitHub],
// })

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({

  callbacks: {
    async signIn({user , account}) {
        if(account?.provider !== "credentials") return true;
        const existingUser = await getUserById(user.id);
        if(!existingUser?.emailVerified) return false;

        return true;
    },
    async jwt({ token }) {
      console.log("token", token)
      token.customField = "sameer"
      return token
    },
    async session({ session, token }) {
      console.log("session token", session)
      // session.user.customToken = token.customField;
      return session
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  // secret: "123345",
  ...authConfig
})