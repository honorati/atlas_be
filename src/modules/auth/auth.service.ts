import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDTO } from './dtos/auth.dto';
import { validateHash } from '~/utils/hash-phrase';
import { LoginPayload } from '~/auth/dtos/loginPayload.dto';
import { UserReturnDTO } from '../user/dtos/user-return.dto';
import { UserAuthReturn } from './dtos/user-auth-return.dto';

@Injectable()
export class AuthService {
   constructor(
      private readonly userService: UserService,
      private jwtService: JwtService,
   ) {}

   async login(authDto: AuthDTO): Promise<UserAuthReturn> {
      let user = await this.userService.getUserByEmail(authDto.login);

      if (!user) {
         user = await this.userService.getUserByLogin(authDto.login);
      }

      if (!user) {
         throw new NotFoundException();
      }

      const isMatch = await validateHash(
         authDto.password,
         user?.password || '',
      );

      if (!user || !isMatch) {
         throw new NotFoundException('Email or passord invalid');
      }

      return {
         accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
         user: new UserReturnDTO(user),
      };
   }
}
