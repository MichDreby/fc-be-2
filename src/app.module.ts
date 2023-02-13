import * as Joi from 'joi'

import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { NewsModule } from './news/news.module'
import { PlayersModule } from './players/players.module'
import { TeamModule } from './team/team.module'
import { UsersModule } from './users/users.module'
import { AssetsModule } from './assets/assets.module'

const APP_ENV = process.env.APP_ENV ?? 'development'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${APP_ENV}`,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_URL: Joi.string().required(),
        DB_SSL: Joi.boolean().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    NewsModule,
    PlayersModule,
    TeamModule,
    UsersModule,
    AssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
