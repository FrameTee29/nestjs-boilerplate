import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';

import { AppModule } from 'src/app.module';
import { NestConfig } from '@config/configuration.interface';
// import { ResponseExceptionFilter } from '@commons/exceptions/response.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  // const httpAdapter = app.get(HttpAdapterHost);
  const nestConfig = configService.get<NestConfig>('nest');

  app.use(helmet());

  app.setGlobalPrefix('api');

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false,
      transform: true,
      whitelist: true,
    }),
  );

  // app.useGlobalFilters(new ResponseExceptionFilter(httpAdapter, configService));

  // TODO: Exception

  const swaggerConfig = new DocumentBuilder()
    .setTitle('boilerplate')
    .setDescription('The boilerplate API description')
    .setVersion('1')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = nestConfig?.port || 3001;

  await app.listen(port);
  Logger.log(`Started application in NODE_ENV=${nestConfig?.env} on port ${port}`);
}
bootstrap();
