import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';

import { AppModule } from 'src/app.module';
import { NestConfig } from '@config/configuration.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const swaggerConfig = new DocumentBuilder()
    .setTitle('boilerplate')
    .setDescription('The boilerplate API description')
    .setVersion('1')
    .build();

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

  // TODO: Exception

  const port = nestConfig?.port || 3001;

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port);
  Logger.log(`Started application in NODE_ENV=${nestConfig?.env} on port ${port}`);
}
bootstrap();
