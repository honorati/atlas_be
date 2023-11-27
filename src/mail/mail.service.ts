import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class SendMail {
   async sendMail(
      toMail: string,
      subjectMail: string,
      bodyMail: string,
   ): Promise<void> {
      const transporter = nodemailer.createTransport({
         host: 'smtp.ethereal.email',
         port: 587,
         auth: {
            user: 'your_username',
            pass: 'your_password',
         },
      });

      try {
         const info = await transporter.sendMail({
            from: 'seu_email@gmail.com',
            to: toMail,
            subject: subjectMail,
            text: bodyMail,
         });

         console.log('E-mail enviado: ', info);
      } catch (error) {
         console.error('Erro ao enviar e-mail: ', error);
         throw new Error('Erro ao enviar e-mail');
      }
   }
}
