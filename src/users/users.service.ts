import { Repository } from 'typeorm'
import { map } from 'lodash'

import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from './entities/user.entity'
import { CreateUserDto, UpdateUserDto, RemoveBatchUserDto } from './dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(user)
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    return await this.usersRepository.save({
      id,
      ...user,
    })
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find()
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    })
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id)
  }

  async removeBatch(ids: RemoveBatchUserDto[]): Promise<void> {
    const idsArray = map(ids, 'id')

    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id IN (:...ids)', {
        ids: idsArray,
      })
      .execute()
  }
}
