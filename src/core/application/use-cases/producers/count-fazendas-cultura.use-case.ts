import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/services/base/use-case';
import { ProducersRepository } from 'src/infrastructure/database/repositories/produtor.repository';
import { Result } from 'src/shared/utils/results-api.base';
import { CountFazendasCulturaResponseDTO } from '../../dto/producers/count-fazendas-cultura-response.dto';

@Injectable()
export class CountFazendasCulturaUseCase
  implements UseCase<Result<CountFazendasCulturaResponseDTO[]>>
{
  constructor(private producersRepository: ProducersRepository) {}

  async run(): Promise<Result<CountFazendasCulturaResponseDTO[]>> {
    const data = await this.producersRepository.countFazendasPorCultura();

    return Result.Ok<CountFazendasCulturaResponseDTO[]>({
      data,
    });
  }
}
