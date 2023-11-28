import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EnailController } from './email.controller';

@Module({
   providers: [EmailService],
   controllers: [EnailController],
})
export class EmailModule {}
