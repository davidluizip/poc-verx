import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/services/base/use-case';
import { ProducersRepository } from 'src/infrastructure/database/repositories/produtor.repository';
import { Result } from 'src/shared/utils/results-api.base';
import { ProducersCountResponseDTO } from '../../dto/producers/producers.count-response.dto';

@Injectable()
export class CountUseCase
  implements UseCase<Result<ProducersCountResponseDTO>>
{
  constructor(private producersRepository: ProducersRepository) {}

  async run(): Promise<Result<ProducersCountResponseDTO>> {
    const res = await this.producersRepository.countFazendas();

    return Result.Ok<ProducersCountResponseDTO>({
      data: { count: res },
    });
  }
}
