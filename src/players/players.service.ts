import { Repository } from 'typeorm'
import { map } from 'lodash'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Player } from './entities/player.entity'
import { CreatePlayerDto, RemoveBatchPlayerDto, UpdatePlayerDto } from './dto'

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playersRepository: Repository<Player>,
  ) {}

  async findAll(): Promise<Player[]> {
    return await this.playersRepository.find()
  }

  async create(player: CreatePlayerDto): Promise<Player> {
    return await this.playersRepository.save(player)
  }

  async createBatch(players: CreatePlayerDto[]): Promise<Player[]> {
    return await this.playersRepository.save(players)
  }

  async findOne(id: string): Promise<Player> {
    return await this.playersRepository.findOne({
      where: {
        id,
      },
    })
  }

  async update(id: string, player: UpdatePlayerDto): Promise<Player> {
    return await this.playersRepository.save({
      id,
      ...player,
    })
  }

  async remove(id: string): Promise<void> {
    await this.playersRepository.delete(id)
  }

  async removeBatch(ids: RemoveBatchPlayerDto[]): Promise<void> {
    const idsArray = map(ids, 'id')

    await this.playersRepository
      .createQueryBuilder()
      .delete()
      .from(Player)
      .where('id IN (:...ids)', {
        ids: idsArray,
      })
      .execute()
  }
}
