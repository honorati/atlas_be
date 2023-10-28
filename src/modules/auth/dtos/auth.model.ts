import { UserReturnDTO } from '../../user/dtos/user-return.dto';

export class AuthModel {
   token: string;
   user: UserReturnDTO;

   constructor(token: string, user: UserReturnDTO) {
      this.token = token;
      this.user = user;
   }
}
