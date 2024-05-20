import { db } from "@/lib/db";

export const verificationTokenByEmail = async (email: string)=>{
    try {
        const verificationToken = await db.verificicationToken.findFirst({where: {email}})
        return verificationToken
    } catch (error) {
        
    }
}

export const verificationTokenByToken = async (token: string)=>{
    try {
        const verificationToken = await db.verificicationToken.findFirst({where: {token}})
        return verificationToken
    } catch (error) {
        
    }
}