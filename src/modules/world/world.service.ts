import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worlds } from '~/entities/worlds/worlds.entity';
import { FileService } from '~/modules/file-manager/file.service';
import { WorldDTO } from './dto/world.dto';
import { FileDTO } from '../file-manager/dtos/file.dto';
import { JwtService } from '@nestjs/jwt';
import { Users } from '~/entities/users/users.entity';
import env from 'dotenv';

env.config();

const googleFolder = process.env.DRIVE_WORLDS;

@Injectable()
export class WorldService {
   constructor(
      @InjectRepository(Worlds)
      private readonly worldRepository: Repository<Worlds>,
      @InjectRepository(Users)
      private readonly userRepository: Repository<Users>,
      private readonly fileService: FileService,
      private jwtService: JwtService,
   ) {}

   async manageWorld(
      userId: number,
      worldDTO: WorldDTO,
      image: FileDTO,
   ): Promise<Worlds> {
      const world = new Worlds();
      try {
         world.name = worldDTO.name;
         world.title = worldDTO.title;
         world.description = worldDTO.description;
         world.user = await this.userRepository.findOneBy({
            id: userId,
         });
         console.log(googleFolder);
         if (image.originalname) {
            world.image = await this.fileService.uploadGoogleDrive(
               image,
               world.name,
               googleFolder,
            );
         }
         await this.worldRepository.save(world);
         console.log(world);

         delete world.user;
         return world;
      } catch (err) {
         console.log(err);
         throw new InternalServerErrorException();
      }
   }
}
