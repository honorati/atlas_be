import {
   Body,
   Controller,
   Delete,
   Patch,
   Post,
   UploadedFile,
   UseInterceptors,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common';
import { Roles } from '~/decorators/roles.decorator';
import { UserType } from '~/enum/user-type.enum';
import { TokenUserId } from '~/decorators/user-id.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { WorldService } from './world.service';
import { WorldDTO } from './dto/world.dto';
import { FileDTO } from '../file-manager/dtos/file.dto';
import { diskStorage } from 'multer';

const uploadType = process.env.UPLOAD_TYPE;

@Controller('world')
export class WorldController {
   constructor(private readonly worldService: WorldService) {}

   @Roles(UserType.ADMIN, UserType.PREMIUM, UserType.VALID)
   @Post()
   @UsePipes(ValidationPipe)
   @UseInterceptors(
      FileInterceptor('imageMap', {
         storage: diskStorage({
            destination: process.env.UPLOAD_PATH,
            filename: (req, file, cb) => {
               if (uploadType === 'LOCAL') {
                  const newFileName =
                     req.body.uniqueId +
                     '.' +
                     file.originalname.split('.').pop();
                  cb(null, newFileName);
               } else {
                  cb(null, file.originalname);
               }
            },
         }),
      }),
   )
   async manageWorld(
      @Body() worldDTO: WorldDTO,
      @TokenUserId() userId: number,
      @UploadedFile() fileDTO: FileDTO,
   ) {
      return this.worldService.createWorld(userId, worldDTO, fileDTO);
   }

   @Roles(UserType.ADMIN, UserType.PREMIUM, UserType.VALID)
   @Patch()
   @UsePipes(ValidationPipe)
   @UseInterceptors(
      FileInterceptor('imageMap', {
         storage: diskStorage({
            destination: process.env.UPLOAD_PATH,
            filename: (req, file, cb) => {
               if (uploadType === 'LOCAL') {
                  const newFileName =
                     req.body.uniqueId +
                     '.' +
                     file.originalname.split('.').pop();
                  cb(null, newFileName);
               } else {
                  cb(null, file.originalname);
               }
            },
         }),
      }),
   )
   async updateWorld(
      @Body() worldDTO: WorldDTO,
      @UploadedFile() fileDTO: FileDTO,
   ) {
      return this.worldService.updateWorld(worldDTO, fileDTO);
   }

   @Roles(UserType.ADMIN, UserType.PREMIUM, UserType.VALID)
   @Delete()
   @UsePipes(ValidationPipe)
   async deleteUser(@TokenUserId() worldId: number) {
      return this.worldService.deleteWorld(worldId);
   }
}
