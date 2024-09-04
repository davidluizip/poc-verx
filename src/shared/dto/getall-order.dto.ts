import { ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationRequestDTO } from './pagination-request.dto';

enum Sort {
  ASC = 'asc',
  DESC = 'desc',
}

enum EGetAllCultures {
  nome = 'nome',
}

export class GetAllCulturesDTO extends PaginationRequestDTO {
  @IsEnum(EGetAllCultures)
  @IsOptional()
  @Expose()
  @ApiPropertyOptional({ enum: EGetAllCultures, name: 'orderBy[name]' })
  name?: EGetAllCultures;

  @ApiPropertyOptional({
    description: '',
    required: false,
    enum: Sort,
  })
  sort: Sort;
}
