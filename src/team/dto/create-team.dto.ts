import { ArrayNotEmpty, IsArray, IsInt, IsString } from 'class-validator'

export class CreateTeamDto {
  @IsString()
  name: string
  @IsInt()
  founded: number
  @IsArray()
  @ArrayNotEmpty()
  @IsString({
    each: true,
  })
  club_colors: string[]
  @IsString()
  venue: string
  @IsString()
  website: string
}
