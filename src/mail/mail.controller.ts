import { Controller, Post, Body } from '@nestjs/common';
import { SendMail } from './mail.service';

@Controller('email')
export class MailController {
   constructor(private readonly mailService: SendMail) {}

   @Post('enviar')
   async sendMail(
      @Body() body: { toMail: string; subjectMail: string; bodyMail: string },
   ): Promise<void> {
      const { toMail: to, subjectMail: subject, bodyMail: text } = body;
      await this.mailService.sendMail(to, subject, text);
   }
}
