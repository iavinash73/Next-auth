# Nextjs 14 user auth

## Overview

The project is a web application built with Next.js 14, featuring a robust set of authentication and user management functionalities. It enables users to register either through traditional email and password or via Google authentication. The application employs a MongoDB database to securely store user registration data. Server actions are used to implement api. Email verification and forgot password functionalities are also implemented using Resend and node mailer. It's a comprehensive application allowing user to register and login with ease. Error handling is implemented with Sonner for toast notifications. 

## Features

### User Registration

- Users can register with their email and password.
- Email verification is implemented for added security.
- Verification emails are sent using Node Mailer and Resend.

### Forgot Password

- Users can reset their password using the "Forgot Password" feature.
- Password reset links are sent to the user's email and changes are reflected in DB in realtime.

### Google Authentication

- Users can register or log in using Google authentication.
- Integration with Google OAuth for a seamless user experience.

### Next.js 14 and App Router

- Developed with Next.js 14.
- Utilizes the Next.js App Router for efficient client-side navigation.

### MongoDB Integration

- User registration data is stored in MongoDB.
- Passwords and sensitive information are securely hashed.

### Tailwind CSS

- Styling is done using Tailwind CSS for a responsive and clean UI.

### Intermediate Page

- New users are redirected to an intermediate page after authentication.
- Provides a smooth onboarding experience.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
