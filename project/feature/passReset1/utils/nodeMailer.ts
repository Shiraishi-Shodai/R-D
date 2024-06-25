import { SendEmailDto } from "../types";
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
  const { sender, recipients, subject, message } = dto;
  return await transporter.sendMail({
    from: sender,
    to: recipients,
    subject: subject,
    html: message,
    text: message,
  });
};

// 6桁の乱数生成
const getRandomInt = () => {
  const MAX: number = 1000000;
  const MIN: number = 100000;
  const randomInt: number = Math.floor(Math.random() * (MAX - MIN)) + MIN;
  return randomInt.toString();
};

export const getSendEmailDto = (email: string) => {
  const sender = {
    name: "My App",
    address: "siranosuke1227@gmail.com",
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
    subject: "Welcome!",
    message: getRandomInt(),
  };

  return sendDtoObj;
};
