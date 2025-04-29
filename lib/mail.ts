import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendTwoFactorEmail = async (
    email: String,
    token: String
) => {
    try {
        await resend.emails.send({
            from: "Sameer Khan <sameer@msameerk.com>",
            to: email,
            subject: "2FA Code",
            html: `<p>Your 2FA Code is ${token}</p>`
        })
    } catch (error) {
        console.log("error", error)
    }
}
// export const sendPasswordResetEmail = async (email: string, token: string) => {
//     const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

//     console.log("Email", email)
//     try {
//         await resend.emails.send({
//             from: "<Sameer Khan <sameer@msameerk.com>",
//             to: email,
//             subject: "Reset your Password",
//             html: `<p>Click <a href="${resetLink}">Click here </a> to reset your password</p>`
//         })
//     } catch (error) {
//         console.log("error", error)
//     }
// }

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

export const sendPasswordResetEmail = async (
    email: String,
    token: String
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;
    console.log("email", email)
    try {
        await resend.emails.send({
            from: "Sameer Khan <sameer@msameerk.com>",
            to: email,
            subject: "Reset your email",
            html: `<p>Click <a href="${resetLink}">Click here </a> to reset your password</p>`
        })
    } catch (error) {
        console.log("error", error)
    }
} 