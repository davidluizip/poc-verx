// src/infrastructure/database/prisma/repositories/produtor.repository.ts
import { Injectable } from '@nestjs/common';
import { Prisma, Produtores } from '@prisma/client';
import { CountFazendasCulturaResponseDTO } from 'src/core/application/dto/producers/count-fazendas-cultura-response.dto';
import { CountFazendasEstadoResponseDTO } from 'src/core/application/dto/producers/count-fazendas-estado-response.dto';
import { ProducersUpdateDTO } from 'src/core/application/dto/producers/producers.update.dto';
import { SumAreasResponseDTO } from 'src/core/application/dto/producers/sum-areas-response.dto';
import { BaseModel } from 'src/core/domain/repositories/base.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProducersRepository extends BaseModel<Produtores> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: Prisma.ProdutoresCreateInput): Promise<Produtores> {
    return this.prisma.produtores.create({
      data,
    });
  }

  async update(id: number, data: ProducersUpdateDTO): Promise<Produtores> {
    return this.prisma.produtores.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number): Promise<Produtores> {
    return this.prisma.produtores.delete({
      where: {
        id,
      },
    });
  }

  async countFazendas(): Promise<number> {
    const totalFazendas = await this.prisma.produtores.count();
    return totalFazendas;
  }

  async sumTotalHectares(): Promise<number> {
    const result = await this.prisma.produtores.aggregate({
      _sum: {
        areaTotalHectares: true,
      },
    });

    return result._sum.areaTotalHectares ?? 0;
  }

  async countFazendasByEstado(): Promise<CountFazendasEstadoResponseDTO[]> {
    const result = await this.prisma.produtores.groupBy({
      by: ['estado'],
      _count: {
        id: true,
      },
    });

    return result.map((item) => ({
      estado: item.estado,
      totalFazendas: item._count.id,
    }));
  }

  async countFazendasPorCultura(): Promise<CountFazendasCulturaResponseDTO[]> {
    const result = await this.prisma.$queryRaw<
      CountFazendasCulturaResponseDTO[]
    >`
    SELECT c.nome, COUNT(fc.culturas_id) AS total_fazendas
    FROM culturas c
    JOIN fazenda_culturas fc ON c.id = fc.culturas_id
    GROUP BY c.nome
  `;

    return result;
  }

  async sumAreas(): Promise<SumAreasResponseDTO> {
    const result = await this.prisma.produtores.aggregate({
      _sum: {
        areaAgricultavelHectares: true,
        areaVegetacaoHectares: true,
      },
    });

    return {
      areaAgricultavel: result._sum.areaAgricultavelHectares ?? 0,
      areaVegetacao: result._sum.areaVegetacaoHectares ?? 0,
    };
  }
}
