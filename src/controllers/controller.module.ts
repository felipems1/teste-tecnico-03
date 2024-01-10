import { Module } from '@nestjs/common'
import { CreateAccountController } from './user/create-account.controller'
import { AuthenticateController } from './user/authenticate.controller'
import { CreateLocationController } from './location/create-location.controller'
import { DeleteLocationController } from './location/delete-location.controller'
import { GetLocationsListController } from './location/get-locations-list.controller'
import { UpdateLocationController } from './location/update-location.controller'
import { DeleteLocationService } from 'src/services/delete-location.service'
import { GetLocationsListService } from 'src/services/get-locations-list.service'
import { UpdateLocationService } from 'src/services/update-location.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateLocationController,
    DeleteLocationController,
    GetLocationsListController,
    UpdateLocationController,
  ],
  providers: [
    PrismaService,
    DeleteLocationService,
    GetLocationsListService,
    UpdateLocationService,
  ],
})
export class ControllerModule {}
