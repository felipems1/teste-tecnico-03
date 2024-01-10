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
import { DeleteLocationService } from './services/delete-location.service'
import { DeleteLocationController } from './controllers/delete-location.controller'

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
    DeleteLocationController,
  ],
  providers: [PrismaService, GetLocationsListService, DeleteLocationService],
})
export class AppModule {}
