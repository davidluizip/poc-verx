import {
  CallHandler,
  Catch,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { Response } from 'express';
import { Observable, catchError, throwError } from 'rxjs';
import { Result } from '../utils/results-api.base';

@Injectable()
@Catch(
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
  PrismaClientUnknownRequestError,
  PrismaClientInitializationError,
)
export class PrismaExceptionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const response = context.switchToHttp().getResponse<Response>();
    return next
      .handle()
      .pipe(
        catchError((error) =>
          throwError(() => this.handlerError(error, response)),
        ),
      );
  }

  private handlerError(
    exception:
      | Prisma.PrismaClientKnownRequestError
      | Prisma.PrismaClientRustPanicError
      | Prisma.PrismaClientValidationError
      | Prisma.PrismaClientUnknownRequestError
      | Prisma.PrismaClientInitializationError
      | any,
    response: Response,
  ): void {
    let errorMessage: string | string[] =
      'Desculpe! Algo deu errado ao tentar responder esta solicitação. Tente novamente mais tarde.';
    let httpStatus = 500;

    if (exception instanceof PrismaClientRustPanicError) {
      httpStatus = 400;
      errorMessage = exception.message;
    } else if (exception instanceof PrismaClientValidationError) {
      httpStatus = 422;
      errorMessage = exception.message;
    } else if (
      exception instanceof PrismaClientKnownRequestError ||
      exception instanceof PrismaClientUnknownRequestError ||
      exception instanceof PrismaClientInitializationError
    ) {
      httpStatus = 400;
      errorMessage = exception.message;
    } else if (exception?.response) {
      httpStatus = exception?.response?.statusCode;
      errorMessage = exception?.response?.message;
    } else if (
      exception.statusCode &&
      exception.statusCode >= 400 &&
      exception.statusCode <= 499
    ) {
      httpStatus = exception.statusCode;
      errorMessage = exception.message;
    }

    const errorResponse = {
      errors: typeof errorMessage === 'string' ? [errorMessage] : errorMessage,
    };

    response
      .status(httpStatus)
      .json(
        Result.Fail(
          'PrismaExceptionInterceptor',
          JSON.stringify(errorResponse),
        ),
      );
  }
}
