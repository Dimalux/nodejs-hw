// src/utils/sendMail.js


import nodemailer from 'nodemailer';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendMail = async (options) => {
  try {
    await transporter.sendMail(options);

    return {
      message: 'Password reset email sent successfully',
    };
  } catch (error) {
    console.error('Email sending failed:', error);

    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};
