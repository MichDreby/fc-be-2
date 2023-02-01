import { IsString } from 'class-validator'

export class RemoveBatchPlayerDto {
  @IsString()
  id: string
}
