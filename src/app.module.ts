import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      password: String(process.env.DB_PASSWORD),
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      entities: [`${__dirname}/entities/**/*.entity{.js,.ts}`],
      migrations: [`${__dirname}/migration/{.ts,*.js}`],
      migrationsRun: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    JwtModule,
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
