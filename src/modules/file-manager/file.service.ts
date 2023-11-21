import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google } from 'googleapis';
import { FileDTO } from './dtos/file.dto';
import { Readable } from 'stream';
import env from 'dotenv';

env.config();

const uploadType = process.env.UPLOAD_TYPE;

Injectable();
export class FileService {
   async uploadFile(
      file: FileDTO,
      name: string,
      folder: string,
   ): Promise<string> {
      if (uploadType == 'GOOGLE') {
         if (folder === undefined) {
            return null;
         }
         const auth = new google.auth.GoogleAuth({
            keyFile: 'api-key.json',
            scopes: ['https://www.googleapis.com/auth/drive'],
         });

         const drive = google.drive({ version: 'v3', auth });

         const media = {
            mimeType: file.mimetype,
            body: Readable.from(file.buffer),
         };

         try {
            const resp = await drive.files.create({
               requestBody: {
                  name: name,
                  parents: [folder],
               },
               media: media,
               fields: 'id',
            });
            return resp.data.id;
            //https://drive.google.com/uc?export=view&id=
         } catch (error) {
            throw new InternalServerErrorException();
         }
      } else {
         console.log('Teste');
      }
   }

   async deleteFile(fileId: string): Promise<void> {
      if (uploadType == 'GOOGLE') {
         const auth = new google.auth.GoogleAuth({
            keyFile: 'api-key.json',
            scopes: ['https://www.googleapis.com/auth/drive'],
         });

         const drive = google.drive({ version: 'v3', auth });
         try {
            drive.files.delete({ fileId: fileId });
         } catch (error) {
            throw new InternalServerErrorException(error);
         }
      } else {
         console.log('Teste');
      }
   }
}
