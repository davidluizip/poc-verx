import { Injectable } from '@nestjs/common';
import { Produtores } from '@prisma/client';
import { UseCase } from 'src/core/domain/services/base/use-case';
import { ProducersRepository } from 'src/infrastructure/database/repositories/produtor.repository';
import { Result } from 'src/shared/utils/results-api.base';
import { ProducersCreateDTO } from '../../dto/producers/producers.create.dto';
import { mapToPrisma } from '../../mappers/producers/producers.mapper';

export interface ICreateProducers {
  producers: ProducersCreateDTO;
}

@Injectable()
export class CreateUseCase implements UseCase<Result<Produtores>> {
  constructor(private producersRepository: ProducersRepository) {}

  async run({ producers }: ICreateProducers): Promise<Result<Produtores>> {
    const newProducers = mapToPrisma(producers);

    const data = await this.producersRepository.create(newProducers);

    const result = Result.Ok<Produtores>({
      data,
    });

    return result;
  }
}
