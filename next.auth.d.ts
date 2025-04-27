import NextAuth, { type DefaultSession } from "next-auth";

import {JWT} from "@auth/core/jwt"
import { UserRole } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole
}

declare module "next-auth" {
    interface Session {
        user: ExtendedUser
        id: string
    } 
}


declare module "@auth/core/jwt" {
    interface JWT{
        role?: "ADMIN" | "USER"
    }
}

declare module "@auth/core/jwt" {
    interface SignIn{
        id: string
    }
}