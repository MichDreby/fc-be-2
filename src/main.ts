// import helmet from 'helmet'
// import { rateLimit } from 'express-rate-limit'

import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import 'dotenv/config'

import { AppModule } from './app.module'
// import { E_TOO_MANY_REQUESTS } from './common/exceptions'
import { APP_DESCRIPTION, APP_NAME, APP_VERSION } from './common/constants'

async function bootstrap() {
  // -- App Instantiation
  const app = await NestFactory.create(AppModule)

  // todo: enable for production
  // // -- Helmet
  // app.use(helmet())

  // -- Cors setup
  app.enableCors()

  // todo: enable for production
  // // -- Rate limiting: Limits the number of requests from the same IP in a period of time.
  // // -- More at: https://www.npmjs.com/package/express-rate-limit
  // app.use(
  //   rateLimit({
  //     windowMs: 10 * 60 * 1000, // 10 minutes
  //     max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
  //     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  //     legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
  //     skipSuccessfulRequests: false, // The counting will skip all successful requests and just count the errors. Instead of removing rate-limiting, it's better to set this to true to limit the number of times a request fails. Can help prevent against brute-force attacks
  //     message: {
  //       message: E_TOO_MANY_REQUESTS,
  //       statusCode: 403,
  //     },
  //   }),
  // )

  // -- Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  // -- Swagger setup
  const config = new DocumentBuilder()
    .setTitle(APP_NAME)
    .setDescription(APP_DESCRIPTION)
    .setVersion(APP_VERSION)
    .addBearerAuth() // The API will use Bearer Authentication
    .addBasicAuth({
      type: 'apiKey',
      name: 'accessToken',
      in: 'query',
    }) // The API will use basic authentication for admin access
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  // todo: return default 3000 PORT
  // -- Start listening
  await app.listen(process.env.PORT ? parseInt(process.env.PORT) : 3000)
  // await app.listen(300)
}

bootstrap()
