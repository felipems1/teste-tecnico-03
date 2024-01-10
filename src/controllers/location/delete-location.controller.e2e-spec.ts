import { INestApplication } from '@nestjs/common'
import { AppModule } from 'src/app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Delete location (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)

    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[DELETE] /locations', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.location.create({
      data: {
        name: 'praia do bessa',
        city: 'cabedelo',
        state: 'paraiba',
      },
    })

    const locations = await prisma.location.findMany()

    const locationId = locations[0].id

    const response = await request(app.getHttpServer())
      .delete('/locations')
      .query({ id: locationId })
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(204)

    const locationOnDatabase = await prisma.location.findUnique({
      where: {
        id: locationId,
      },
    })

    expect(locationOnDatabase).toBeNull()
  })
})
