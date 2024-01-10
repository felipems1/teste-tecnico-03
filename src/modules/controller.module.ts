import { Module } from '@nestjs/common'
import { CreateAccountController } from '../controllers/user/create-account.controller'
import { AuthenticateController } from '../controllers/user/authenticate.controller'
import { CreateLocationController } from '../controllers/location/create-location.controller'
import { DeleteLocationController } from '../controllers/location/delete-location.controller'
import { GetLocationsListController } from '../controllers/location/get-locations-list.controller'
import { UpdateLocationController } from '../controllers/location/update-location.controller'
import { DeleteLocationService } from 'src/services/location/delete-location.service'
import { GetLocationsListService } from 'src/services/location/get-locations-list.service'
import { UpdateLocationService } from 'src/services/location/update-location.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAccountService } from 'src/services/user/create-account.service'
import { AuthenticateService } from 'src/services/user/authenticate.service'
import { CreateLocationService } from 'src/services/location/create-location.service'

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
    CreateLocationService,
    DeleteLocationService,
    GetLocationsListService,
    UpdateLocationService,
    CreateAccountService,
    AuthenticateService,
  ],
})
export class ControllerModule {}
