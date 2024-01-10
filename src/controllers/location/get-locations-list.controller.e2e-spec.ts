import { INestApplication } from '@nestjs/common'
import { AppModule } from 'src/app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from 'src/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'

describe('Get locations list (E2E)', () => {
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

  test('[GET] /locations', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.location.createMany({
      data: [
        {
          name: 'praia do bessa',
          city: 'cabedelo',
          state: 'paraiba',
        },
        {
          name: 'praia do sol',
          city: 'joão pessoa',
          state: 'paraiba',
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/locations')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([
      expect.objectContaining({
        name: 'praia do bessa',
        city: 'cabedelo',
      }),
      expect.objectContaining({
        name: 'praia do sol',
        city: 'joão pessoa',
      }),
    ])

    const responseFilter = await request(app.getHttpServer())
      .get('/locations')
      .query({ name: 'praia do bessa' })
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(responseFilter.statusCode).toBe(200)
    expect(responseFilter.body).toEqual([
      expect.objectContaining({
        name: 'praia do bessa',
      }),
    ])
  })
})
