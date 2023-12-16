"use server";
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';

export const changePassword = async (forgotPasswordToken: string, password: string) => {
    const user = await User.findOne({ forgotPasswordToken: forgotPasswordToken })
    if (!user) {
        throw new Error('User not found');
    }
    // console.log(user)

    const forgotPasswordTokenExpiry = user.forgotPasswordTokenExpiry;
    if (!forgotPasswordTokenExpiry) {
        throw new Error('Token expired');
    }

    const today = new Date();

    if (today > forgotPasswordTokenExpiry) {
        throw new Error('Token expired');
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    await User.updateOne({ email: user.email }, { password: passwordHash, forgotPasswordToken: null, forgotPasswordTokenExpiry: null })
    return "Password changed successfully"
}