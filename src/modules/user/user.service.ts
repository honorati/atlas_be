import {
   BadRequestException,
   Injectable,
   InternalServerErrorException,
   NotFoundException,
} from '@nestjs/common';
import { UserInsertDTO } from './dtos/user-insert.dto';
import { Users } from '~/entities/users/users.entity';
import { createHash } from 'src/utils/hash-phrase';
import { UserReturnDTO } from './dtos/user-return.dto';
import { UserEditPasswordDTO } from './dtos/user-edit-passwor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from '~/enum/user-type.enum';
import { LoginPayload } from '~/auth/dtos/loginPayload.dto';
import { JwtService } from '@nestjs/jwt';
import { UserAuthReturn } from '../auth/dtos/user-auth-return.dto';
import { FileService } from '../file-manager/file.service';
import { FileDTO } from '../file-manager/dtos/file.dto';

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(Users)
      private readonly userRepository: Repository<Users>,
      private readonly fileService: FileService,
      private jwtService: JwtService,
   ) {}

   async createUser(
      userDTO: UserInsertDTO,
      avatar: FileDTO,
   ): Promise<UserAuthReturn> {
      const userEmail = await this.getUserByEmail(userDTO.email).catch(
         () => undefined,
      );

      if (userEmail) {
         throw new BadRequestException();
      }
      /*Validando se o login já foi incluido no sistema*/
      const userLogin = await this.getUserByLogin(userDTO.login).catch(
         () => undefined,
      );

      if (userLogin) {
         throw new BadRequestException();
      }

      const user = new Users();
      try {
         user.login = userDTO.login;
         user.name = userDTO.name;
         user.email = userDTO.email;
         user.password = await createHash(userDTO.password);
         user.type = UserType.INVALID;
         user.mailing = userDTO.mailing;
         user.notification = userDTO.notification;
         const link = await createHash(userDTO.login);
         user.recoverylink = link.replace(/[^a-zA-Z0-9 ]/g, '');
         if (avatar.originalname) {
            user.avatar = await this.fileService.uploadGoogleDrive(
               avatar,
               user.login,
               process.env.DRIVE_USERS,
            );
         }
         this.userRepository.save(user);
      } catch (err) {
         console.log(err);
         throw new InternalServerErrorException();
      }

      return {
         accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
         user: new UserReturnDTO(user),
      };
   }

   async getUserById(userid: number): Promise<Users> {
      if (!userid) {
         throw new NotFoundException();
      }
      const user = await this.userRepository.findOneBy({
         id: userid,
      });

      if (!user) {
         throw new NotFoundException();
      }

      return user;
   }

   async getUserByEmail(useremail: string): Promise<Users> {
      const user = await this.userRepository.findOneBy({
         email: useremail,
      });

      return user;
   }

   async getUserByLogin(userlogin: string): Promise<Users> {
      const user = await this.userRepository.findOneBy({
         login: userlogin,
      });

      return user;
   }

   async getUserByLink(link: string): Promise<Users> {
      const user = await this.userRepository.findOneBy({
         recoverylink: link,
         type: UserType.INVALID,
      });
      return user;
   }

   async activateUser(link: string): Promise<UserAuthReturn> {
      const user = await this.getUserByLink(link).catch(() => undefined);

      if (!user) {
         throw new NotFoundException();
      }

      user.type = UserType.VALID;
      await this.userRepository.save(user);

      return {
         accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
         user: new UserReturnDTO(user),
      };
   }

   async editPassword(
      userId: number,
      userDTO: UserEditPasswordDTO,
   ): Promise<UserReturnDTO> {
      const user = await this.getUserById(userId);
      user.password = await createHash(userDTO.password);
      await this.userRepository.save(user);

      const userReturn: UserReturnDTO = {
         login: user.login,
         avatar: user.avatar,
         type: user.type,
      };

      return userReturn;
   }

   async changeAvatar(
      userId: number,
      avatar: FileDTO,
   ): Promise<UserAuthReturn> {
      const user = await this.getUserById(userId);

      await this.fileService.deleteGoogleDrive(user.avatar);

      user.avatar = await this.fileService.uploadGoogleDrive(
         avatar,
         user.login,
         process.env.DRIVE_USERS,
      );
      this.userRepository.save(user);

      return {
         accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
         user: new UserReturnDTO(user),
      };
   }

   async deleteUser(userId: number): Promise<void> {
      await this.userRepository
         .createQueryBuilder()
         .softDelete()
         .where('id = :id', { id: userId })
         .execute();
   }
}
