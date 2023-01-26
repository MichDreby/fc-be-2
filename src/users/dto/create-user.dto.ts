import { IsDateString, IsInt, IsString } from 'class-validator'

export type ShirtSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'

export class CreateUserDto {
  @IsString()
  first_name: string
  @IsString()
  last_name: string
  @IsString()
  shirt_name: string
  @IsInt()
  shirt_number: number
  // todo: add custom validation decorator (@IsShirtSize)
  @IsString()
  shirt_size: ShirtSize
  @IsDateString()
  birthday: Date
  @IsString()
  nationality: string
  @IsString()
  favorite_player: string
}
