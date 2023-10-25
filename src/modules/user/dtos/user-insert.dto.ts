export interface UserInsertDTO {
  name: string;
  login: string;
  email: string;
  image: string;
  password: string;
  type: number;
  available: boolean;
  mailing: boolean;
  notification: boolean;
}
