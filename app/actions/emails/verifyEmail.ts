'use server'
import { sendEmail } from "@/app/actions/emails/sendEmail";
import { VerifyEmailEmailTemplate } from "@/app/components/email-templates/verify-email-email";
import User from "@/app/models/User";
import crypto from 'crypto';
;


export const verifyEmail = async (email: string) => {
    const emailVerificationToken = crypto.randomBytes(32).toString("base64url");
    const temp = await User.findOneAndUpdate({ email: email }, {
        $set: { emailVerificationToken: emailVerificationToken }
    });
    if (email) {
        await sendEmail({
            from: 'Admin <admin@example.in>',
            to: [email],
            subject: 'Verify your email address',
            react: VerifyEmailEmailTemplate({ email, emailVerificationToken }) as React.ReactElement
        });
    }
    return 'Mail sent'
}