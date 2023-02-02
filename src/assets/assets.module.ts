import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AssetsService } from './assets.service'
import { AssetsController } from './assets.controller'

@Module({
  imports: [ConfigModule],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
