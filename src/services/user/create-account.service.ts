import { Injectable, ConflictException } from '@nestjs/common'
import { hash } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'

interface CreateAccountBodySchema {
  name: string
  email: string
  password: string
}

@Injectable()
export class CreateAccountService {
  constructor(private prisma: PrismaService) {}

  async createAccount(body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with the same e-mail address already exists.',
      )
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
