import * as React from 'react';

interface ResetPasswordEmailTemplateProps {
    email: string;
    forgotPasswordToken: string;
}

export const ForgetPasswordEmailTemplate: React.FC<Readonly<ResetPasswordEmailTemplateProps>> = ({ email, forgotPasswordToken }) => (
    <div>
        <h1>Reset password for <b>{email}</b></h1>
        <p>
            To reset your password, click on this link and follow the instructions:
        </p>
        <a href={`http://localhost:3000/forgot-password?token=${forgotPasswordToken}`}>
            Click here to reset password
        </a>
    </div>
);