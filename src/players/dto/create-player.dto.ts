import { IsDateString, IsInt, IsString } from 'class-validator'

export type PlayerPosition =
  | 'goalkeeper'
  | 'defender'
  | 'midfielder'
  | 'striker'
  | 'manager'
  | 'coach'
  | 'stuff'

export class CreatePlayerDto {
  @IsString()
  first_name: string
  @IsString()
  last_name: string
  @IsString()
  shirt_name: string
  @IsString()
  position: PlayerPosition
  @IsDateString()
  birthday: Date
  @IsString()
  nationality: string
  @IsInt()
  shirt_number: number
  @IsDateString()
  contract_start: Date
  @IsDateString()
  contract_end: Date
}
