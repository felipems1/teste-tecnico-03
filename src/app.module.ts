import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env/env'
import { AuthModule } from './modules/auth.module'

import { ControllerModule } from './modules/controller.module'
import { ServiceModule } from './modules/service.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    ControllerModule,
    ServiceModule,
  ],
})
export class AppModule {}
