import {
  Controller,
  Delete,
  HttpCode,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

import { DeleteLocationService } from 'src/services/location/delete-location.service'
import { z } from 'zod'

const idQueryParamSchema = z.string()

@Controller('/locations')
@UseGuards(JwtAuthGuard)
@UsePipes(new ZodValidationPipe(idQueryParamSchema))
export class DeleteLocationController {
  constructor(private deleteLocationService: DeleteLocationService) {}

  @Delete()
  @HttpCode(204)
  async handle(@Query('id') locationId: string) {
    await this.deleteLocationService.deleteLocation(locationId)
  }
}
