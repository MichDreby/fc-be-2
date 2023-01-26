import { Body, Controller, Get, Post } from '@nestjs/common'

import { AssetsService } from './assets.service'

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('/emblem')
  async retrieveEmblem(): Promise<string> {
    return await this.assetsService.retrieveEmblem()
  }

  @Post('/emblem')
  async uploadEmblem(@Body() emblem: Buffer) {
    return await this.assetsService.uploadEmblem(emblem)
  }
}
