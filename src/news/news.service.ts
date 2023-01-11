import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { News } from './entities/news.entity';
import { CreateNewsDto, UpdateNewsDto } from './dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
  ) {}

  async findAll(): Promise<News[]> {
    return await this.newsRepository.find();
  }

  async create(News: CreateNewsDto): Promise<News> {
    return await this.newsRepository.save(News);
  }

  async findOne(id: string): Promise<News> {
    return await this.newsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, News: UpdateNewsDto): Promise<News> {
    return await this.newsRepository.save({
      id,
      ...News,
    });
  }

  async remove(id: string): Promise<void> {
    await this.newsRepository.delete(id);
  }
}
