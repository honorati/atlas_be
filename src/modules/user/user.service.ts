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
import { generateCode } from '~/utils/random-code';
import env from 'dotenv';
import { EmailService } from '../email/email.service';

env.config();

const folder = process.env.DRIVE_USERS;

@Injectable()
export class UserService {
   constructor(
      @InjectRepository(Users)
      private readonly userRepository: Repository<Users>,
      private readonly fileService: FileService,
      private jwtService: JwtService,
      private readonly mailService: EmailService,
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
         user.activation = generateCode(6);
         if (avatar) {
            user.avatar = await this.fileService.uploadFile(
               avatar,
               user.login,
               folder,
            );
         }
         await this.userRepository.save(user);
         this.mailService.sendMail(
            user.email,
            'Código de validação - Atlas do Multiverso',
            'Acesse o site e insira o código de validação: ' + user.activation,
         );
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
      const user = await this.userRepository
         .createQueryBuilder('users')
         .where('users.recoverylink = :link', { link: link })
         .andWhere('users.updatedAt > :date', {
            date: new Date(Date.now() - 30 * 60000),
         })
         .getOne();
      return user;
   }

   async recoverAccount(recover: string): Promise<void> {
      let user = await this.getUserByEmail(recover);

      if (!user) {
         user = await this.getUserByLogin(recover);
      }
      if (user) {
         const hash = await createHash(user.login);
         user.recoverylink = hash.replace(/[^a-zA-Z0-9 ]/g, '');
         await this.userRepository.save(user);
         this.mailService.sendMail(
            user.email,
            'Código de recuperação - Atlas do Multiverso',
            'Este é seu código de recuperação, ele é valido por 30 minutos: ' +
               user.recoverylink,
         );
      }
   }

   async secretRecovery(userDTO: UserInsertDTO): Promise<UserAuthReturn> {
      const user = await this.getUserByLink(userDTO.recoveryLink);
      if (!user) {
         throw new NotFoundException();
      }
      user.password = await createHash(userDTO.password);
      user.recoverylink = null;
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
      newAvatar: FileDTO,
   ): Promise<UserReturnDTO> {
      const user = await this.getUserById(userId);
      if (user.avatar) {
         this.fileService.deleteFile(user.avatar);
      }

      user.avatar = await this.fileService.uploadFile(
         newAvatar,
         user.login,
         folder,
      );
      this.userRepository.save(user);

      const userReturn: UserReturnDTO = {
         login: user.login,
         avatar: user.avatar,
         type: user.type,
      };

      return userReturn;
   }

   async validateUser(userId: number, code: string): Promise<UserAuthReturn> {
      const user = await this.getUserById(userId);
      if (user.activation !== code) {
         throw new BadRequestException();
      } else {
         user.type = UserType.VALID;
         user.activation = null;
      }
      this.userRepository.save(user);

      return {
         accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
         user: new UserReturnDTO(user),
      };
   }

   async changeRole(userLogin: string, type: number): Promise<UserReturnDTO> {
      const user = await this.getUserByLogin(userLogin);

      if (!user) {
         throw new NotFoundException();
      }

      user.type = type;
      this.userRepository.save(user);

      const userReturn: UserReturnDTO = {
         login: user.login,
         avatar: user.avatar,
         type: user.type,
      };

      return userReturn;
   }

   async deleteUser(userId: number): Promise<void> {
      await this.userRepository
         .createQueryBuilder()
         .softDelete()
         .where('id = :id', { id: userId })
         .execute();
   }
}
