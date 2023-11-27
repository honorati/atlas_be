import { Module } from '@nestjs/common';
import { SendMail } from './mail.service';
import { MailController } from './mail.controller';

@Module({
   providers: [SendMail],
   controllers: [MailController],
})
export class EmailModule {}
