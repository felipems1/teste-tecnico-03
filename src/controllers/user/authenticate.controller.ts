import { Body, Controller, Post, UsePipes } from '@nestjs/common'

import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

import { AuthenticateService } from 'src/services/user/authenticate.service'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

@Controller('/sessions')
export class AuthenticateController {
  constructor(private authenticateService: AuthenticateService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateBodySchema) {
    return this.authenticateService.authenticateUser(body)
  }
}
