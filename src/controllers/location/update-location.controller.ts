import { Body, Controller, Put, Query, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { UpdateLocationService } from 'src/services/update-location.service'
import { z } from 'zod'

const updateLocationBodySchema = z.object({
  name: z.string(),
  city: z.string(),
  state: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(updateLocationBodySchema)

const idQueryParamSchema = z.string()

const queryValidationPipe = new ZodValidationPipe(idQueryParamSchema)

type UpdateLocationBodySchema = z.infer<typeof updateLocationBodySchema>

@Controller('/locations')
@UseGuards(JwtAuthGuard)
export class UpdateLocationController {
  constructor(private updateLocationService: UpdateLocationService) {}

  @Put()
  async handle(
    @Body(bodyValidationPipe) body: UpdateLocationBodySchema,
    @Query('id', queryValidationPipe) locationId: string,
  ) {
    await this.updateLocationService.updateLocation(locationId, body)
  }
}
