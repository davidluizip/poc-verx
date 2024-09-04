import { Controller, Get } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { CulturesResponseDTO } from 'src/core/application/dto/cultures/cultures-response.dto';
import {
  SwaggerErrorResponse,
  WithBaseGetResponse,
} from 'src/core/application/dto/swagger/swagger.dto';
import { CulturesService } from 'src/core/domain/services/cultures/cultures.service';
import { FindAllCulturesQueryDTO } from 'src/shared/dto/find-all-query.dto';
import { IFindAllRequest } from 'src/shared/interfaces/find-all-params.interface';
import { ValidParams } from 'src/shared/utils/decorators/validate-filters.decorator';

@ApiTags('Cultures')
@Controller()
export class CulturesController {
  constructor(private readonly servive: CulturesService) {}

  @Get()
  @ApiResponse({
    status: 200,
    type: WithBaseGetResponse(CulturesResponseDTO),
  })
  @ApiResponse({
    status: 400,
    type: SwaggerErrorResponse,
  })
  @ApiQuery({
    type: FindAllCulturesQueryDTO,
    required: false,
  })
  findAll(
    @ValidParams(FindAllCulturesQueryDTO)
    {
      pagination,
      orderBy,
      filters,
    }: IFindAllRequest<Prisma.CulturasWhereInput>,
  ) {
    return this.servive.findAll({
      pagination,
      orderBy,
      filters,
    });
  }
}
