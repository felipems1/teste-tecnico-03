import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class GetLocationsListService {
  constructor(private prisma: PrismaService) {}

  async getAllLocations() {
    return await this.prisma.location.findMany()
  }

  async getLocationsByName(name: string) {
    return await this.prisma.location.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    })
  }
}
