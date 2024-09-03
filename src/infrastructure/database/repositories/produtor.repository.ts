// src/infrastructure/database/prisma/repositories/produtor.repository.ts
import { Injectable } from '@nestjs/common';
import { Produtores } from '@prisma/client';
import { ProducersCreateDTO } from 'src/core/application/dto/producers/producers.create.dto';
import { BaseModel } from 'src/core/domain/repositories/base.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProducersRepository extends BaseModel<Produtores> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: ProducersCreateDTO): Promise<Produtores> {
    return this.prisma.produtores.create({
      data,
    });
  }
}
