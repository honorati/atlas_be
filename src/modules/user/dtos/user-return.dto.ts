import { Users } from '~/entities/users/users.entity';

export class UserReturnDTO {
   login: string;
   avatar: string;
   type: number;

   constructor(user: Users) {
      this.login = user.login;
      this.avatar = user.avatar;
      this.type = user.type;
   }
}
