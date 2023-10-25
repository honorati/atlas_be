import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { UserService } from './user.service';
import { UserEditPasswordDTO } from './dtos/user-edit-passwor.dto';
import { Roles } from '~/decorators/roles.decorator';
import { UserType } from '~/enum/user-type.enum';
import { TokenUserId } from '~/decorators/user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async postCreate(@Body() userInsert: UserInsertDTO) {
    return this.userService.createUser(userInsert);
  }

  @Get('/:userid')
  async postActivate(@Param('userid') userid) {
    return this.userService.activateUser(userid);
  }

  @Roles(UserType.ADMIN, UserType.PREMIUM, UserType.VALID)
  @Patch()
  @UsePipes(ValidationPipe)
  async patchEditPassword(
    @Body() userEditSenhaDTO: UserEditPasswordDTO,
    @TokenUserId() userid: number,
  ) {
    return this.userService.editPassword(userid, userEditSenhaDTO);
  }
}
