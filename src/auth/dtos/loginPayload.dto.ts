import { Users } from '~/entities/users/users.entity';

export class LoginPayload {
   userid: number;
   usertipo: number;

   constructor(user: Users) {
      this.userid = user.id;
      this.usertipo = user.type;
   }
}
