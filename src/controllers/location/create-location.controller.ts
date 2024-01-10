import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

import { CreateLocationService } from 'src/services/location/create-location.service'
import { z } from 'zod'

const createLocationBodySchema = z.object({
  name: z.string(),
  city: z.string(),
  state: z.string(),
})

type CreateLocationBodySchema = z.infer<typeof createLocationBodySchema>

@Controller('/locations')
@UseGuards(JwtAuthGuard)
export class CreateLocationController {
  constructor(private createLocationService: CreateLocationService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createLocationBodySchema))
  async handle(@Body() body: CreateLocationBodySchema) {
    await this.createLocationService.createLocation(body)
  }
}
