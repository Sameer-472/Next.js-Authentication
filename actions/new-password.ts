"use server"

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schema";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export const newPassword = async(values: z.infer<typeof NewPasswordSchema> , token: string | null)=>{
    if(!token){
        return "Missing token"
    };

    const validateFields = NewPasswordSchema.safeParse(values);

    if(!validateFields.success){
        return "Invalid Fields";
    }

    const {password } = validateFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    const hasExpired = existingToken?.expires < new Date();

    if(hasExpired){
        return {error: "Token has expired"};
    }

    const existingUser = await getUserByEmail(existingToken?.email);

    if(!existingUser){
        return {error: "Email does not exist"}
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    await db.user.update({
        where: {id: existingUser.id},
        data: {password: hashedPassword}
    })

    await db.passwordResetToken.delete({
        where: {id: existingToken?.id}
    })

    return {success: "Password Updated"}
}