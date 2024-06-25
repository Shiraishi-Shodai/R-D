import Mail from "nodemailer/lib/mailer";
export type SendEmailDto = {
  sender: Mail.Address;
  recipients: Mail.Address[];
  subject: string;
  message: string;
};
