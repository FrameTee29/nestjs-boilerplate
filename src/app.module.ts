import { APP_FILTER } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import * as redisStore from 'cache-manager-ioredis';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppService } from 'src/app.service';
import configuration from '@config/configuration';
import { AppController } from 'src/app.controller';
import { ResponseExceptionFilter } from '@commons/exceptions/response.exception';

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
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ResponseExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
