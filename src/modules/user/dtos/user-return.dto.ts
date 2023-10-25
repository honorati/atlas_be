import { Users } from '~/entities/user/user.entity';

export class UserReturnDTO {
  login: string;
  image: string;
  type: number;

  constructor(user: Users) {
    this.login = user.login;
    this.image = user.image;
    this.type = user.type;
  }
}
