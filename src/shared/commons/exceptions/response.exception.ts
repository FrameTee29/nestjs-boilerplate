import {
  Catch,
  Logger,
  HttpStatus,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ResponseExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger('[ResponseExceptionFilter]');
  constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly configService: ConfigService) {}

  catch(exception: Error, host: ArgumentsHost) {
    this.logger.log('( Catch )');

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();

    const statusCode = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof BadRequestException
        ? ((exception as any).response.message as string)
        : exception.message || 'Internal server error';

    const errorBody = {
      success: false,
      error: {
        statusCode,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        detail: message,
        errorName: exception?.name,
      },
    };

    httpAdapter.reply(ctx.getResponse(), errorBody, statusCode);
  }
}
