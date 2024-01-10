import { INestApplication } from '@nestjs/common'
import { AppModule } from 'src/app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Create location (E2E)', () => {
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

  test('[POST] /locations', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    const response = await request(app.getHttpServer())
      .post('/locations')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'praia bessa',
        city: 'joão pessoa',
        state: 'paraiba',
      })

    expect(response.statusCode).toBe(201)

    const locationOnDatabase = await prisma.location.findFirst({
      where: {
        name: 'praia bessa',
      },
    })

    expect(locationOnDatabase).toBeTruthy()
  })
})
