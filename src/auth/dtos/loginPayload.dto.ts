import { Users } from '~/entities/user/user.entity';

export class LoginPayload {
  userid: number;
  usertipo: number;

  constructor(user: Users) {
    this.userid = user.id;
    this.usertipo = user.type;
  }
}
