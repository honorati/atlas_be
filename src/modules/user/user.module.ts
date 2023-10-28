import { Module } from '@nestjs/common';
import { Users } from '~/entities/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { FileService } from '../file-manager/file.service';

@Module({
   imports: [
      TypeOrmModule.forFeature([Users]),
      JwtModule.registerAsync({
         useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
         }),
      }),
   ],
   controllers: [UserController],
   providers: [UserService, FileService],
   exports: [UserService, FileService],
})
export class UserModule {}
