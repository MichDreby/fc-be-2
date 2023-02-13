import { Repository } from 'typeorm'
import { S3 } from 'aws-sdk'

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
// import { logger } from '@utils'

import { Team } from './entities/team.entity'
import { CreateTeamDto, UpdateTeamDto } from './dto'

const s3 = new S3()
const ASSETS_BUCKET_NAME = 'fc-assets-bucket'
const TEAM_EMBLEM_KEY = 'teamEmblem'

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
  ) {}

  async create(data: CreateTeamDto): Promise<Team> {
    const team = await this.teamRepository.createQueryBuilder('team').getOne()

    if (team) {
      throw new HttpException(
        'Team is already exist, please use update',
        HttpStatus.CONFLICT,
      )
    } else {
      return await this.teamRepository.save(data)
    }
  }

  // todo:
  // 1. looks like we need to remake Team interface
  // and include emblemUrl prop there
  async findOne(): Promise<Team & { emblemUrl: string }> {
    try {
      const params = {
        Bucket: ASSETS_BUCKET_NAME,
        Key: TEAM_EMBLEM_KEY,
      }

      const emblemUrl = s3.getSignedUrl('getObject', params)

      const team = await this.teamRepository.createQueryBuilder('team').getOne()

      return {
        ...team,
        emblemUrl,
      }
    } catch (error) {
      // todo: add absolute paths
      // logger(error)

      // eslint-disable-next-line no-console
      console.log('******\n', 'error', error)
    }
  }

  async update(data: UpdateTeamDto): Promise<UpdateTeamDto> {
    const { id } = await this.teamRepository.createQueryBuilder('team').getOne()

    return await this.teamRepository.save({
      id,
      ...data,
    })
  }
}
