import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  ParseUUIDPipe,
  Param,
  Delete,
  ParseArrayPipe,
} from '@nestjs/common'

import { PlayersService } from './players.service'
import { Player } from './entities'
import { CreatePlayerDto, RemoveBatchPlayerDto, UpdatePlayerDto } from './dto'

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async findAll(): Promise<Player[]> {
    return await this.playersService.findAll()
  }

  @Post()
  async create(@Body() player: CreatePlayerDto): Promise<Player> {
    return await this.playersService.create(player)
  }

  @Post('/batch')
  async createBatch(
    @Body(
      new ParseArrayPipe({
        items: CreatePlayerDto,
      }),
    )
    players: CreatePlayerDto[],
  ): Promise<Player[]> {
    return await this.playersService.createBatch(players)
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Player> {
    return await this.playersService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Body() player: UpdatePlayerDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Player> {
    return await this.playersService.update(id, player)
  }

  // !important:
  // in case of both '/batch' and ':id' endpoints are presented
  // place /batch endpoint first, otherwise ':id' won't work
  // or some unexpected errors might appear
  @Delete('/batch')
  async removeBatch(
    @Body(
      new ParseArrayPipe({
        items: RemoveBatchPlayerDto,
      }),
    )
    ids: RemoveBatchPlayerDto[],
  ): Promise<void> {
    await this.playersService.removeBatch(ids)
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.playersService.remove(id)
  }
}
