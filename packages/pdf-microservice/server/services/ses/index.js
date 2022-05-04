import nodemailer from 'nodemailer';
import { defaultProvider } from '@aws-sdk/credential-provider-node';
const aws = require('@aws-sdk/client-ses');

export const sendSESEmailWithAttachments = mailOptions => {
  const ses = new aws.SES({
    apiVersion: '2010-12-01',
    region: process.env.AWS_REGION,
    defaultProvider
  });

  // create Nodemailer SES transporter
  const transporter = nodemailer.createTransport({
    SES: { ses, aws }
  });

  return transporter.sendMail(mailOptions);
};
