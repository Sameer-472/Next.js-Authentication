import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import { db } from "./lib/db"


// export const {
//   handlers: { GET, POST },
//   auth,
// } = NextAuth({
//   providers: [GitHub],
// })

export const {handlers: {GET , POST}  , auth , signIn , signOut} = NextAuth({

  callbacks: {
    async jwt({token}){
      
      token.customField = "sameer"
      console.log("token" , token)
      return token
    },
    async session({session , token}){
      console.log("session"  ,session.user)
      session.user.customToken = token.customField;
      console.log("sessionToken"  ,token)
      return session
    } 
  },
  adapter: PrismaAdapter(db),
  session: {strategy: "jwt"},
  // secret: "123345",
  ...authConfig
})