import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: String,
    token: String
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`
    console.log("email", email)
    try {
        await resend.emails.send({
            from: "Sameer Khan <sameer@msameerk.com>",
            to: email,
            subject: "Confirm your email",
            html: `<p>Click <a href="${confirmLink}">Click here </a> to confirm your email</p>`
        })
    } catch (error) {
        console.log("error", error)
    }
} 