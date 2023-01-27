import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch()
export class ResponseExceptionFilter implements ExceptionFilter {
  private logger: Logger = new Logger('[ResponseExceptionFilter]');
  constructor(private readonly httpAdapterHost: HttpAdapterHost, private readonly configService: ConfigService) {}

  catch(exception: Error, host: ArgumentsHost) {
    this.logger.log('( Catch )');
    console.log('[ResponseExceptionFilter] - catch (exception) ', exception);
    console.log('[ResponseExceptionFilter] - catch (host) ', host);
  }
}
