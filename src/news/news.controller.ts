import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  ParseUUIDPipe,
  Param,
  Delete,
} from '@nestjs/common'

import { NewsService } from './news.service'
import { News } from './entities'
import { CreateNewsDto, UpdateNewsDto } from './dto'

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll(): Promise<News[]> {
    return await this.newsService.findAll()
  }

  @Post()
  async create(@Body() News: CreateNewsDto): Promise<News> {
    return await this.newsService.create(News)
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<News> {
    return await this.newsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Body() News: UpdateNewsDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<News> {
    return await this.newsService.update(id, News)
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.newsService.remove(id)
  }
}
