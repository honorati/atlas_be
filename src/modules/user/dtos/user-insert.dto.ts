export interface UserInsertDTO {
   name: string;
   login: string;
   email: string;
   password: string;
   type: number;
   available: boolean;
   mailing: boolean;
   notification: boolean;
}
