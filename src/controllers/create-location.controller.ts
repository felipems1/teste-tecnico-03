import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { PrismaService } from 'src/prisma/prisma.service'
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
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createLocationBodySchema))
  async handle(@Body() body: CreateLocationBodySchema) {
    const { city, name, state } = body

    const locationNameAlreadyExists = await this.prisma.location.findUnique({
      where: {
        name,
      },
    })

    if (locationNameAlreadyExists) {
      throw new ConflictException('Location name already exists.')
    }

    await this.prisma.location.create({
      data: {
        name,
        city,
        state,
      },
    })
  }
}
