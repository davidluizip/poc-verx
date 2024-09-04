import { Injectable } from '@nestjs/common';
import { Culturas, Prisma } from '@prisma/client';
import { FindAllUseCase } from 'src/core/application/use-cases/cultures/find-all.use-case';
import { IFindAllRequest } from 'src/shared/interfaces/find-all-params.interface';
import { Result } from 'src/shared/utils/results-api.base';

@Injectable()
export class CulturesService {
  constructor(private readonly findAllUseCase: FindAllUseCase) {}

  findAll = ({
    filters,
    pagination,
    orderBy,
  }: IFindAllRequest<Prisma.CulturasWhereInput>): Promise<Result<Culturas[]>> =>
    this.findAllUseCase.run({
      filters,
      pagination,
      orderBy,
    });
}
