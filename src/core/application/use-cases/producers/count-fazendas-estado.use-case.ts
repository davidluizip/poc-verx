import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/services/base/use-case';
import { ProducersRepository } from 'src/infrastructure/database/repositories/produtor.repository';
import { Result } from 'src/shared/utils/results-api.base';
import { CountFazendasEstadoResponseDTO } from '../../dto/producers/count-fazendas-estado-response.dto';

@Injectable()
export class CountFazendasByEstadoUseCase
  implements UseCase<Result<CountFazendasEstadoResponseDTO[]>>
{
  constructor(private producersRepository: ProducersRepository) {}

  async run(): Promise<Result<CountFazendasEstadoResponseDTO[]>> {
    const data = await this.producersRepository.countFazendasByEstado();

    return Result.Ok<CountFazendasEstadoResponseDTO[]>({
      data,
    });
  }
}
