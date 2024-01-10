import { Module } from '@nestjs/common'

import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateLocationController } from './controllers/create-location.controller'
import { GetLocationsListController } from './controllers/get-locations-list.controller'
import { GetLocationsListService } from './services/get-locations-list.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateLocationController,
    GetLocationsListController,
  ],
  providers: [PrismaService, GetLocationsListService],
})
export class AppModule {}
