import { Express } from 'express'

import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { AssetsService } from './assets.service'

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Get('/emblem')
  async retrieveEmblem(): Promise<string> {
    return await this.assetsService.retrieveEmblem()
  }

  @Post('/emblem')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.assetsService.uploadEmblem(file)
  }
}
