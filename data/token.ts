import { v4 as uuid } from "uuid";
import { verificationTokenByEmail } from "./verification-token";
import { db } from "@/lib/db";

export const generateVerificationToken = async (email: string) => {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await verificationTokenByEmail(email)

    if (existingToken) {
        await db.verificicationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    const verificationToken = await db.verificicationToken.create({
        data: {
            email,
            token,
            expires
        }
    })

    return verificationToken
}