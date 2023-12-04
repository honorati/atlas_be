import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { WorldModule } from './modules/world/world.module';
import { EmailModule } from './modules/email/email.module';
import { MulterModule } from '@nestjs/platform-express';

const uploadType = process.env.UPLOAD_TYPE;

let multerModuleOptions = {};

if (uploadType === 'LOCAL') {
   multerModuleOptions = {
      dest: process.env.UPLOAD_PATH,
   };
}

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: ['.env'],
      }),
      MulterModule.register(multerModuleOptions),
      TypeOrmModule.forRoot({
         type: 'mysql',
         database: process.env.DB_DATABASE,
         host: process.env.DB_HOST,
         password: String(process.env.DB_PASSWORD),
         port: Number(process.env.DB_PORT),
         username: process.env.DB_USERNAME,
         entities: [`${__dirname}/entities/**/*.entity{.js,.ts}`],
         migrations: [`${__dirname}/migration/{.ts,*.js}`],
         migrationsRun: false,
         synchronize: true,
      }),
      UserModule,
      WorldModule,
      AuthModule,
      JwtModule,
      EmailModule,
   ],
   controllers: [],
   providers: [
      {
         provide: APP_GUARD,
         useClass: RolesGuard,
      },
   ],
})
export class AppModule {}
