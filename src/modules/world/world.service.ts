import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Worlds } from '~/entities/worlds/worlds.entity';
import { FileService } from '~/modules/file-manager/file.service';
import { WorldDTO } from './dto/world.dto';
import { FileDTO } from '../file-manager/dtos/file.dto';
import { JwtService } from '@nestjs/jwt';
import { Users } from '~/entities/users/users.entity';
import { v4 as uuidv4 } from 'uuid';
import env from 'dotenv';

env.config();

const folder = process.env.DRIVE_WORLDS;

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

   async createWorld(
      userId: number,
      worldDTO: WorldDTO,
      image: FileDTO,
   ): Promise<Worlds> {
      const world = new Worlds();
      try {
         world.name = worldDTO.name;
         world.title = worldDTO.title;
         world.description = worldDTO.description;
         world.uniqueId = uuidv4();
         world.user = await this.userRepository.findOneBy({
            id: userId,
         });
         if (image) {
            world.image = await this.fileService.uploadFile(
               image,
               world.uniqueId,
               folder,
            );
         }
         await this.worldRepository.save(world);

         delete world.user;
         return world;
      } catch (err) {
         console.log(err);
         throw new InternalServerErrorException();
      }
   }

   async getWorldById(worldId: number): Promise<Worlds> {
      const world = await this.worldRepository.findOneBy({
         id: worldId,
      });
      console.log(world);
      return world;
   }

   async updateWorld(worldDTO: WorldDTO, newImage: FileDTO): Promise<WorldDTO> {
      try {
         if (newImage) {
            const result = await this.getWorldById(worldDTO.id);
            if (result.image) {
               try {
                  await this.fileService.deleteFile(result.image);
               } catch (error) {
                  console.log(error);
               }
            }
            if (!result.uniqueId) {
               worldDTO.uniqueId = uuidv4();
            } else {
               worldDTO.uniqueId = result.uniqueId;
            }
            worldDTO.image = await this.fileService.uploadFile(
               newImage,
               worldDTO.uniqueId,
               folder,
            );
         }

         await this.worldRepository
            .createQueryBuilder()
            .update(Worlds)
            .set({
               name: worldDTO.name,
               title: worldDTO.title,
               description: worldDTO.description,
               image: worldDTO.image,
               uniqueId: worldDTO.uniqueId,
            })
            .where('id = :id', { id: worldDTO.id })
            .execute();

         return worldDTO;
      } catch (err) {
         console.log(err);
         throw new InternalServerErrorException();
      }
   }

   async deleteWorld(worldId: number): Promise<void> {
      await this.worldRepository
         .createQueryBuilder()
         .softDelete()
         .where('id = :id', { id: worldId })
         .execute();
   }
}
