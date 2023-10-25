import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async postCreate(@Body() authDTO: AuthDTO) {
    return this.authService.login(authDTO);
  }
}
