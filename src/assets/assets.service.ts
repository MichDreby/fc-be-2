import { S3 } from 'aws-sdk'

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

const ASSETS_BUCKET_NAME = 'fc-assets-bucket'
const TEAM_EMBLEM_KEY = 'teamEmblem'

@Injectable()
export class AssetsService {
  private s3: S3

  constructor(private configService: ConfigService) {
    this.s3 = new S3({
      accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    })
  }

  async retrieveEmblem(): Promise<string> {
    const params = {
      Bucket: ASSETS_BUCKET_NAME,
      Key: TEAM_EMBLEM_KEY,
    }

    const emblemUrl = this.s3.getSignedUrl('getObject', params)

    return emblemUrl
  }

  async uploadEmblem({ buffer }: Express.Multer.File): Promise<void> {
    try {
      await this.s3
        .putObject({
          Bucket: ASSETS_BUCKET_NAME,
          Key: TEAM_EMBLEM_KEY,
          ACL: 'public-read',
          Body: buffer,
        })
        .promise()
    } catch (error) {
      throw new HttpException(
        error?.message || 'custom error',
        error?.status || HttpStatus.PRECONDITION_FAILED,
      )
    }
  }
}
