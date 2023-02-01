import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Patch,
  ParseArrayPipe,
} from '@nestjs/common'

import { UsersService } from './users.service'
import { User } from './entities'
import { CreateUserDto, UpdateUserDto, RemoveBatchUserDto } from './dto'

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.create(user)
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return await this.usersService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Body() user: UpdateUserDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User> {
    return await this.usersService.update(id, user)
  }

  // !important:
  // in case of both '/batch' and ':id' endpoints are presented
  // place /batch endpoint first, otherwise ':id' won't work
  // or some unexpected errors might appear
  @Delete('/batch')
  async removeBatch(
    @Body(
      new ParseArrayPipe({
        items: RemoveBatchUserDto,
      }),
    )
    ids: RemoveBatchUserDto[],
  ): Promise<void> {
    await this.usersService.removeBatch(ids)
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.usersService.remove(id)
  }
}
