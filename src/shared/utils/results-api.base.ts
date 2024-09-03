import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';

export interface IMeta {
  pagination?: IPagination;
}

export interface IPagination {
  page: number;
  limit: number;
  totalResultRows: number;
  totalPages: number;
}

export type IData<T> = T extends T ? T : T[];

export interface IResponse<T> {
  data: IData<T>;
  meta?: IMeta;
}

export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: any;
  public statusCode: HttpStatus;
  private _value: IResponse<T>;

  private constructor(
    isSuccess: boolean,
    error?: any,
    value?: IResponse<T>,
    statusCode?: HttpStatus,
  ) {
    this.statusCode = statusCode || HttpStatus.OK;

    if (isSuccess && error) {
      throw new Error(`InvalidOperation: Um response OK não pode ser
      bem-sucedido e contém um erro`);
    }
    if (!isSuccess && !error) {
      throw new Error(`InvalidOperation: Um response FAIL
      precisa conter uma mensagem de erro`);
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this._value = value;

    Object.freeze(this);
  }

  public getValue(): IResponse<T> {
    if (!this.isSuccess) {
      return this.handlerError();
    }

    return this._value;
  }

  public static Ok<U>(value?: IResponse<U>): Result<U> {
    return new Result<U>(true, null, value);
  }

  public static Fail<U>(
    origin: string,
    error: any,
    statusCode?: HttpStatus,
  ): Result<U> {
    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR)
      console.error(origin, error?.message);

    return new Result<U>(false, error, null, statusCode);
  }

  public static Combine(results: Result<any>[]): Result<any> {
    for (const result of results) {
      if (result.isFailure) return result;
    }
    return Result.Ok<any>();
  }

  private handlerError(): IResponse<T> {
    if (this.statusCode)
      throw new HttpException(
        {
          error: this.error,
          isFailure: this.isFailure,
          isSuccess: this.isSuccess,
        },
        this.statusCode,
      );
    else
      throw new BadRequestException({
        error: this.error,
        isFailure: this.isFailure,
        isSuccess: this.isSuccess,
      });
  }
}
