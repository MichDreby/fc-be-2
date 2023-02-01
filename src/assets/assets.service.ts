import { S3 } from 'aws-sdk'

import { Injectable } from '@nestjs/common'

const s3 = new S3()
// todo: add BUCKET_NAME to env variables
// const BUCKET_NAME = process.env.BUCKET_NAME
const BUCKET_NAME = 'fc-assets-bucket'
const TEAM_EMBLEM_KEY = 'teamEmblem'

@Injectable()
export class AssetsService {
  async retrieveEmblem(): Promise<string> {
    const params = {
      Bucket: BUCKET_NAME,
      Key: TEAM_EMBLEM_KEY,
    }

    const emblemUrl = s3.getSignedUrl('getObject', params)

    return emblemUrl
  }

  async uploadEmblem({ buffer }: Express.Multer.File): Promise<void> {
    await s3
      .putObject({
        Bucket: BUCKET_NAME,
        Key: TEAM_EMBLEM_KEY,
        ACL: 'public-read',
        Body: buffer,
      })
      .promise()
  }
}
