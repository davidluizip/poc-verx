import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IFindAllRequest } from 'src/shared/interfaces/find-all-params.interface';
import { Paginated } from 'src/shared/types/types';
import { PrismaService } from '../prisma/prisma.service';
import { ProxyPrismaModel } from '../services/prisma-proxy';

@Injectable()
export class CulturesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    filters,
    pagination,
    orderBy,
  }: IFindAllRequest<Prisma.CulturasWhereInput>): Promise<
    Paginated<{
      id: number;
      nome: string;
      createdAt: Date;
      updatedAt: Date;
    }>
  > {
    const model = ProxyPrismaModel(this.prisma.culturas);

    return model.findManyPaginated(
      {
        select: {
          id: true,
          nome: true,
        },
        where: filters,
        orderBy,
      },
      {
        limit: pagination.limit,
        page: pagination.page,
      },
    );
  }
}
