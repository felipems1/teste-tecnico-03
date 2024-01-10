import { INestApplication } from '@nestjs/common'
import { AppModule } from 'src/app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Update location (E2E)', () => {
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

  test('[PUT] /locations', async () => {
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
      .put('/locations')
      .query({ id: locationId })
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'updated name',
        city: 'updated city',
        state: 'updated state',
      })

    expect(response.statusCode).toBe(200)

    const locationOnDatabase = await prisma.location.findUnique({
      where: {
        id: locationId,
      },
    })

    expect(locationOnDatabase).toEqual(
      expect.objectContaining({
        name: 'updated name',
        city: 'updated city',
        state: 'updated state',
      }),
    )
  })
})
