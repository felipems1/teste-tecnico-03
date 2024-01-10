import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'

interface UpdateLocationType {
  name: string
  city: string
  state: string
}

@Injectable()
export class UpdateLocationService {
  constructor(private prisma: PrismaService) {}

  async updateLocation(locationId: string, updateData: UpdateLocationType) {
    const existingLocation = await this.prisma.location.findUnique({
      where: { id: locationId },
    })

    if (!existingLocation) {
      throw new NotFoundException('Location with ID not found')
    }

    return this.prisma.location.update({
      where: { id: locationId },
      data: updateData,
      select: {
        id: true,
        name: true,
        city: true,
        state: true,
        updatedAt: true,
      },
    })
  }
}
