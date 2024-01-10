import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcryptjs'
import { PrismaService } from 'src/prisma/prisma.service'

interface AuthenticateType {
  email: string
  password: string
}

@Injectable()
export class AuthenticateService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async authenticateUser(body: AuthenticateType) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const expiresIn = 60 * 60 // 1 hour

    const accessToken = this.jwt.sign(
      { sub: user.id },
      { expiresIn, secret: process.env.JWT_SECRET },
    )

    return {
      access_token: accessToken,
    }
  }
}
