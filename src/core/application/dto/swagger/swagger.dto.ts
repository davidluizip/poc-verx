import { mixin } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class SwaggerPagination {
  @ApiProperty({ required: false, example: 1, description: 'Current Page' })
  page: number;

  @ApiProperty({
    required: false,
    example: 10,
    description: 'Quantity of items per page',
  })
  limit: number;

  @ApiProperty({
    required: false,
    example: 100,
    description: 'Total of items',
  })
  totalResultRows: number;

  @ApiProperty({
    required: false,
    example: 10,
    description: 'Total of pages',
  })
  totalPages: number;
}
export class SwaggerOrder {
  @ApiProperty({
    required: false,
    example: 'name',
    description: 'Field to order',
  })
  field: string;

  @ApiProperty({
    required: false,
    example: 'asc',
    description: 'Order type',
  })
  type: 'asc' | 'desc';
}

export class SwaggerMeta {
  @ApiProperty({ required: false, type: SwaggerPagination })
  pagination?: SwaggerPagination;
  @ApiProperty({ required: false, type: SwaggerOrder })
  order?: SwaggerOrder;
}

export class SwaggerResponse<T> {
  @ApiProperty({ required: true, type: Object })
  data: T extends T ? T : T[];

  @ApiProperty({ required: false, type: SwaggerMeta })
  meta?: SwaggerMeta;
}

export class SwaggerCreateResponse<T> {
  @ApiProperty({ required: true, type: () => ({}) as T })
  data: T;
}

type Constructor<T = object> = new (...args: any[]) => T;

export function WithBaseGetResponse<TBase extends Constructor>(
  Base: TBase,
  options?: ApiPropertyOptions | undefined,
) {
  class ResponseDTO {
    @ApiProperty({
      isArray: true,
      type: Base,
      ...options,
    })
    @Type(() => Base)
    @ValidateNested({ each: true })
    data!: InstanceType<TBase>;

    @ApiProperty({ required: false, type: SwaggerMeta })
    @ValidateNested({ each: true })
    meta?: SwaggerMeta;
  }
  return mixin(ResponseDTO);
}

export function WithBasePostPutResponse<TBase extends Constructor>(
  Base: TBase,
  options?: ApiPropertyOptions | undefined,
  isArray = false,
) {
  class ResponseDTO {
    @ApiProperty({
      isArray,
      type: Base,
      ...options,
    })
    @Type(() => Base)
    @ValidateNested({ each: true })
    data!: InstanceType<TBase>;
  }
  return mixin(ResponseDTO);
}

export class SwaggerErrorResponse {
  @ApiProperty({ required: true, type: Boolean, default: false })
  isSuccess = false;

  @ApiProperty({ required: true, type: Boolean, default: true })
  isFailure = true;

  @ApiProperty({ required: true, type: String })
  error: any;

  @ApiProperty({ required: true, type: Number, default: 400 })
  statusCode = 400;

  @ApiProperty({ required: true, type: String, default: null })
  _value = null;
}
