import { Injectable, ConflictException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

interface CreateLocationBodySchema {
  name: string
  city: string
  state: string
}

@Injectable()
export class CreateLocationService {
  constructor(private prisma: PrismaService) {}

  async createLocation(body: CreateLocationBodySchema) {
    const { name, city, state } = body

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
