"use server";
import * as z from "zod";
// import {AuthError}
import { LoginSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import { AuthError } from "next-auth";
import { signIn } from "@/auth"
import { defaultLoginRedirect } from "@/routes";
import { generateVerificationToken } from "@/data/token";


export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(values);

    if (!validateFields.success) {
        return { error: "Invalid fields" }
    }

    const { email, password } = validateFields.data;

    const existinguser = await getUserByEmail(email);

    if (!existinguser || !existinguser.email || !existinguser.password) {
        return {
            error: "Email does not exist"
        }
    }

    console.log("existingUser", existinguser)

    if (!existinguser.emailVerified) {
        // const verificationToken = await generateVerificationToken(existinguser?.email)
        return {
            success: "Confirmation email sent"
        }
    }

    try {
        // console.log("login button clicked")
        await signIn("credentials", {
            email, password, redirectTo: defaultLoginRedirect
        })

    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid Credentials" }
                default:
                    return { error: "Something went wrong" }
            }
        }
        throw error
    }

    return { success: "Login success" }
}