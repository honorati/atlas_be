import {
   Body,
   Controller,
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

@Controller('world')
export class WorldController {
   constructor(private readonly worldService: WorldService) {}

   @Roles(UserType.ADMIN, UserType.PREMIUM, UserType.VALID)
   @Post()
   @UsePipes(ValidationPipe)
   @UseInterceptors(FileInterceptor('image'))
   async manageWorld(
      @Body() worldDTO: WorldDTO,
      @TokenUserId() userid: number,
      @UploadedFile() fileDTO: FileDTO,
   ) {
      return this.worldService.manageWorld(userid, worldDTO, fileDTO);
   }
}
