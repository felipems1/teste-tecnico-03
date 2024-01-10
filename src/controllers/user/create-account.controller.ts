import { Body, Controller, Post, HttpCode, UsePipes } from '@nestjs/common'

import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'

import { CreateAccountService } from 'src/services/user/create-account.service'
import { z } from 'zod'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private createAccountService: CreateAccountService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    await this.createAccountService.createAccount(body)
  }
}
