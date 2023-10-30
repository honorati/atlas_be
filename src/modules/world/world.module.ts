import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorldController } from './world.controller';
import { WorldService } from './world.service';
import { Worlds } from '~/entities/worlds/worlds.entity';
import { JwtModule } from '@nestjs/jwt';
import { FileService } from '../file-manager/file.service';
import { Users } from '~/entities/users/users.entity';
@Module({
   imports: [
      TypeOrmModule.forFeature([Worlds]),
      TypeOrmModule.forFeature([Users]),
      JwtModule.registerAsync({
         useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
         }),
      }),
   ],
   controllers: [WorldController],
   providers: [WorldService, FileService],
   exports: [WorldService, FileService],
})
export class WorldModule {}
