import { DynamicModule, Module } from '@nestjs/common'
import {
  ConfigModule,
  ConfigModuleOptions,
  ConfigService,
} from '@nestjs/config'
import { join } from 'node:path'
import { EnvConfigService } from './env-config.service'

@Module({
  providers: [EnvConfigService],
})
export class EnvConfigModule extends ConfigService {
  static forRoot(options: ConfigModuleOptions = {}): DynamicModule {
    return {
      module: EnvConfigModule,
      imports: [
        ConfigModule.forRoot({
          ...options,
          envFilePath: [
            join(__dirname, `../../../../.env.${process.env.NODE_ENV}`),
          ],
        }),
      ],
      exports: [ConfigModule],
    }
  }
}
