import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { google } from 'googleapis';
import { FileDTO } from './dtos/file.dto';
import { Readable } from 'stream';

Injectable();
export class FileService {
   async uploadGoogleDrive(
      file: FileDTO,
      name: string,
      folder: string,
   ): Promise<string> {
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
   }

   async deleteGoogleDrive(fileId: string): Promise<void> {
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
   }
}
