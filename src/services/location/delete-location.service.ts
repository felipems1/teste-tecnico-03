import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class DeleteLocationService {
  constructor(private prisma: PrismaService) {}

  async deleteLocation(locationId: string) {
    const existingLocation = await this.prisma.location.findUnique({
      where: { id: locationId },
    })

    if (!existingLocation) {
      throw new NotFoundException('Location with ID not found')
    }

    return this.prisma.location.delete({
      where: { id: locationId },
    })
  }
}
