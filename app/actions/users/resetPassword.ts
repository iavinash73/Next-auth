'use server';

import { ForgetPasswordEmailTemplate } from '@/app/components/email-templates/forgot-password-email';
import User from "@/app/models/User";
import dbConnect from "@/app/utils/dbConnect";
import crypto from 'crypto';
import { sendEmail } from '../emails/sendEmail';

export const resetPassword = async (email: string) => {
    // console.log('Resetting password for ' + email);
    await dbConnect();
    const user = await User.findOne({ email: email });
    if (!user) {
        throw new Error('User not found');
    }
    const forgotPasswordToken = crypto.randomBytes(32).toString("base64url");
    const today = new Date();
    const expiryDate = new Date(today.setDate(today.getDate() + 1)); 
    const huh = await User.findOneAndUpdate({ email: email }, {
        $set: {
            forgotPasswordToken: forgotPasswordToken,
            forgotPasswordTokenExpiry: expiryDate
        }
    });
    await sendEmail({
        from: 'Admin <admin@example.in>',
        to: [email],
        subject: 'Reset your password',
        react: ForgetPasswordEmailTemplate({ email, forgotPasswordToken }) as React.ReactElement
    });
    return "Password reset email sent"
};