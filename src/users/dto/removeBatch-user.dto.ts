import { IsString } from 'class-validator'

export class RemoveBatchUserDto {
  @IsString()
  id: string
}
