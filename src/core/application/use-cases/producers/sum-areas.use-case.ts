import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/services/base/use-case';
import { ProducersRepository } from 'src/infrastructure/database/repositories/produtor.repository';
import { Result } from 'src/shared/utils/results-api.base';
import { SumAreasResponseDTO } from '../../dto/producers/sum-areas-response.dto';

@Injectable()
export class SumAreasUseCase implements UseCase<Result<SumAreasResponseDTO>> {
  constructor(private producersRepository: ProducersRepository) {}

  async run(): Promise<Result<SumAreasResponseDTO>> {
    const data = await this.producersRepository.sumAreas();

    return Result.Ok<SumAreasResponseDTO>({
      data,
    });
  }
}
