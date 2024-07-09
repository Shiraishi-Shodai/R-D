// Resendを使用する方法
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const confirmLink = `http://localhost:3000/auth/newVerification?token=${token}`;

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "Confirm your email",
//     html: `<p><a href=${confirmLink}>here</a> to confirm email</p>`,
//   });
// };

// export const sendPasswordResetEmail = async (email: string, token: string) => {
//   const confirmLink = `http://localhost:3000/auth/newPassword?token=${token}`;

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "パスワードリセット",
//     html: `<p><a href=${confirmLink}>here</a> to confirm email</p>`,
//   });
// };

// Nodemailerを使用する方法
import { SendEmailDto } from "@/types/auth";
import nodemailer, { TransportOptions } from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT!, 10),
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
} as TransportOptions);

export const sendEmail = async (dto: SendEmailDto) => {
  const { sender, recipients, subject, html } = dto;
  return await transporter.sendMail({
    from: sender,
    to: recipients,
    subject: subject,
    html: html,
    text: html,
  });
};

export const getVerificationDto = (
  subject: string,
  email: string,
  token: string
) => {
  const confirmLink = `http://localhost:3000/auth/newVerification?token=${token}`;

  const sender = {
    name: "研究開発",
    address: process.env.MAIL_USER as string,
  };

  const recipients = [
    {
      name: email,
      address: email,
    },
  ];
  const sendDtoObj: SendEmailDto = {
    sender,
    recipients,
    subject: subject,
    html: `<p><a href=${confirmLink}>ここ</a>をクリックして認証してください</p>`,
  };

  return sendDtoObj;
};

export const getResetPasswordDto = (
  subject: string,
  email: string,
  token: string
) => {
  const confirmLink = `http://localhost:3000/auth/newPassword?token=${token}`;
  const sender = {
    name: "研究開発",
    address: process.env.MAIL_USER as string,
  };

  const recipients = [
    {
      name: email,
      address: email,
    },
  ];
  const sendDtoObj: SendEmailDto = {
    sender,
    recipients,
    subject: subject,
    html: `<p><a href=${confirmLink}>ここ</a>をクリックして認証してください</p>`,
  };

  return sendDtoObj;
};
