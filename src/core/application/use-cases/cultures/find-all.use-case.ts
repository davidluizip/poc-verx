import { Injectable } from '@nestjs/common';
import { Culturas, Prisma } from '@prisma/client';
import { UseCase } from 'src/core/domain/services/base/use-case';
import { CulturesRepository } from 'src/infrastructure/database/repositories/cultures.repository';
import { IFindAllRequest } from 'src/shared/interfaces/find-all-params.interface';
import { Result } from 'src/shared/utils/results-api.base';

@Injectable()
export class FindAllUseCase implements UseCase<Result<Culturas[]>> {
  constructor(private respository: CulturesRepository) {}

  async run({
    filters,
    pagination,
    orderBy,
  }: IFindAllRequest<Prisma.CulturasWhereInput>): Promise<Result<Culturas[]>> {
    const { data, total, limit, page, totalPages } =
      await this.respository.findAll({
        filters,
        pagination,
        orderBy,
      });

    return Result.Ok<Culturas[]>({
      data,
      meta: { pagination: { page, limit, totalResultRows: total, totalPages } },
    });
  }
}
