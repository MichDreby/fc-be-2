import { Body, Controller, Get, Post, Patch } from '@nestjs/common'

import { TeamService } from './team.service'
import { Team } from './entities'
import { CreateTeamDto, UpdateTeamDto } from './dto'

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() team: CreateTeamDto): Promise<Team> {
    return await this.teamService.create(team)
  }

  @Get()
  async findOne(): Promise<Team> {
    return await this.teamService.findOne()
  }

  @Patch()
  async update(@Body() team: UpdateTeamDto): Promise<UpdateTeamDto> {
    return await this.teamService.update(team)
  }
}
