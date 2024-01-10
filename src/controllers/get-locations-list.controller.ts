import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

import { GetLocationsListService } from 'src/services/get-locations-list.service'

@Controller('/locations')
@UseGuards(JwtAuthGuard)
export class GetLocationsListController {
  constructor(private getLocationsListService: GetLocationsListService) {}

  @Get()
  async handle(@Query('name') name?: string) {
    if (name) {
      return await this.getLocationsListService.getLocationsByName(name)
    } else {
      return await this.getLocationsListService.getAllLocations()
    }
  }
}
