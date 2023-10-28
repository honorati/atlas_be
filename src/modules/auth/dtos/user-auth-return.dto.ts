import { UserReturnDTO } from '~/modules/user/dtos/user-return.dto';

export interface UserAuthReturn {
   accessToken: string;
   user: UserReturnDTO;
}
