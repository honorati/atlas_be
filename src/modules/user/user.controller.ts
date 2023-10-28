import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Patch,
   Post,
   UnauthorizedException,
   UploadedFile,
   UseInterceptors,
   UsePipes,
   ValidationPipe,
} from '@nestjs/common';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { UserService } from './user.service';
import { UserEditPasswordDTO } from './dtos/user-edit-passwor.dto';
import { Roles } from '~/decorators/roles.decorator';
import { UserType } from '~/enum/user-type.enum';
import { TokenUserId } from '~/decorators/user-id.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from '../file-manager/file.service';
import { FileDTO } from '../file-manager/dtos/file.dto';

@Controller('user')
export class UserController {
   constructor(
      private readonly userService: UserService,
      private readonly fileService: FileService,
   ) {}

   @Post()
   @UseInterceptors(FileInterceptor('avatar'))
   async postCreate(
      @Body() userInsert: UserInsertDTO,
      @UploadedFile() fileDTO: FileDTO,
   ) {
      return this.userService.createUser(userInsert, fileDTO);
   }

   @Roles(UserType.ADMIN, UserType.PREMIUM, UserType.VALID, UserType.INVALID)
   @Post('avatar')
   @UsePipes(ValidationPipe)
   @UseInterceptors(FileInterceptor('avatar'))
   async changeAvatar(
      @UploadedFile() fileDTO: FileDTO,
      @TokenUserId() userid: number,
   ) {
      return this.userService.changeAvatar(userid, fileDTO);
   }

   @Get('/:userid')
   async postActivate(@Param('userid') userid) {
      return this.userService.activateUser(userid);
   }

   @Roles(UserType.ADMIN, UserType.PREMIUM, UserType.VALID)
   @Patch()
   @UsePipes(ValidationPipe)
   async patchEditPassword(
      @Body() userEditPassDTO: UserEditPasswordDTO,
      @TokenUserId() userid: number,
   ) {
      return this.userService.editPassword(userid, userEditPassDTO);
   }

   @Roles(UserType.ADMIN, UserType.PREMIUM, UserType.VALID)
   @Delete()
   @UsePipes(ValidationPipe)
   async deleteUser(@TokenUserId() userid: number) {
      return this.userService.deleteUser(userid);
   }

   @Roles(UserType.ADMIN)
   @Post('role')
   @UsePipes(ValidationPipe)
   async changeRole(
      @TokenUserId() userid: number,
      userLogin: string,
      role: number,
   ) {
      if (!userid) {
         throw new UnauthorizedException();
      }
      return this.userService.changeRole(userLogin, role);
   }
}
