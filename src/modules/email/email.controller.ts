import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('mail')
export class EnailController {
   constructor(private readonly mailService: EmailService) {}

   @Post('send')
   async sendMail(
      @Body() body: { toMail: string; subjectMail: string; bodyMail: string },
   ): Promise<void> {
      const { toMail: to, subjectMail: subject, bodyMail: text } = body;
      await this.mailService.sendMail(to, subject, text);
   }
}
