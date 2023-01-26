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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number().default(4000),
        NODE_ENV: Joi.string().default('development'),
        DB_URL: Joi.string().required(),
        DB_SSL: Joi.boolean().required(),
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
