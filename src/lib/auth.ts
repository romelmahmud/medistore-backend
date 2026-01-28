import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASSWORD,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: [process.env.APP_URL!],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        // console.log({ user, url, token });
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Medi Store" <medistore@email.com>',
          to: user.email,
          subject: "Email verification",
          html: `<!DOCTYPE html>
<html lang="en" style="margin:0; padding:0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Email Verification</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
      font-family: Arial, sans-serif;
    "
  >
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color: #f5f5f5; padding: 40px 0;"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            "
          >
            <tr>
              <td
                style="
                  padding: 20px;
                  background-color: #4f46e5;
                  color: #ffffff;
                  text-align: center;
                "
              >
                <h1 style="margin: 0; font-size: 24px;">Verify Your Email</h1>
              </td>
            </tr>

            <tr>
              <td style="padding: 30px; color: #333;">
                <p style="font-size: 16px; margin-bottom: 20px;">
                  Hello ${user.name}  
                  <br />
                  Thank you for signing up! Please verify your email address to complete your registration.
                </p>

                <p style="font-size: 16px; margin-bottom: 30px;">
                  Click the button below to verify your email address:
                </p>

                <p style="text-align: center; margin-bottom: 40px;">
                  <a
                    href="${verificationUrl}"
                    style="
                      background-color: #4f46e5;
                      color: white;
                      text-decoration: none;
                      padding: 12px 25px;
                      font-size: 16px;
                      border-radius: 5px;
                      display: inline-block;
                    "
                  >
                    Verify Email
                  </a>
                </p>

                <p style="font-size: 14px; color: #555;">
                  If the button doesn't work, copy and paste the link below into your browser:
                </p>

                <p
                  style="
                    font-size: 14px;
                    word-break: break-all;
                    color: #4f46e5;
                    margin-bottom: 30px;
                  "
                >
                  ${verificationUrl}
                </p>

                <p style="font-size: 14px; color: #777;">
                  If you didn't create an account, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <tr>
              <td
                style="
                  padding: 15px;
                  background-color: #f0f0f0;
                  text-align: center;
                  font-size: 12px;
                  color: #999;
                "
              >
                © 2025 Prisma Blog. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
