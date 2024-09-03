import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, throwError } from 'rxjs';

import { catchError, map } from 'rxjs/operators';

import { IResponse, Result } from '../utils/results-api.base';

export type TResult = {
  _value: any;
  isSuccess: boolean;
  isFailure: boolean;
  error: string;
};
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  intercept(
    context: ExecutionContext,

    next: CallHandler,
  ): Observable<IResponse<T>> {
    //const http = context.switchToHttp();

    //const request = http.getRequest();

    //const res = http.getResponse();

    return next.handle().pipe(
      map((data: TResult) => {
        if (data?.isSuccess)
          return {
            ...data?._value,
          };

        return data;
      }),

      catchError((error) => {
        if (error instanceof Result) {
          return throwError(() => new HttpException(error, 400));
        }

        return throwError(
          () =>
            new HttpException(
              Result.Fail('internal', error?.message ?? 'ERROR INTERNO', 400),

              400,
            ),
        );
      }),
    );
  }
}
