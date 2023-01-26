import * as redisStore from 'cache-manager-ioredis';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from 'src/app.service';
import configuration from '@config/configuration';
import { AppController } from 'src/app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    CacheModule.register({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: +configService.get('REDIS_PORT'),
        db: configService.get('REDIS_DB'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
