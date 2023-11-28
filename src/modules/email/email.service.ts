import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import env from 'dotenv';

env.config();

@Injectable()
export class EmailService {
   async sendMail(
      toMail: string,
      subjectMail: string,
      bodyMail: string,
   ): Promise<void> {
      const transporter = nodemailer.createTransport({
         host: 'smtp.gmail.com',
         port: 587,
         auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
         },
      });

      try {
         await transporter.sendMail({
            from: '"Atlas do Multiverso" <atlasdomultiverso@gmail.com>',
            to: toMail,
            subject: subjectMail,
            text: bodyMail,
         });
      } catch (error) {
         console.error('Erro ao enviar e-mail: ', error);
         throw new Error('Erro ao enviar e-mail');
      }
   }
}
