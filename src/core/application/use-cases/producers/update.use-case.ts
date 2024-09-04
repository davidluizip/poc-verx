import { Injectable } from '@nestjs/common';
import { Produtores } from '@prisma/client';
import { UseCase } from 'src/core/domain/services/base/use-case';
import { ProducersRepository } from 'src/infrastructure/database/repositories/produtor.repository';
import { Result } from 'src/shared/utils/results-api.base';
import { ProducersUpdateDTO } from '../../dto/producers/producers.update.dto';

export interface IUpdateProducers {
  id: number;
  data: ProducersUpdateDTO;
}

@Injectable()
export class UpdateUseCase implements UseCase<Result<Produtores>> {
  constructor(private producersRepository: ProducersRepository) {}

  async run({ id, data }: IUpdateProducers): Promise<Result<Produtores>> {
    const res = await this.producersRepository.update(id, data);

    const result = Result.Ok<Produtores>({
      data: res,
    });

    return result;
  }
}
