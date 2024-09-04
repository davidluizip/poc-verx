import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/domain/services/base/use-case';
import { ProducersRepository } from 'src/infrastructure/database/repositories/produtor.repository';

export interface IDeleteProducers {
  id: number;
}

@Injectable()
export class DeleteUseCase implements UseCase<void> {
  constructor(private producersRepository: ProducersRepository) {}

  async run({ id }: IDeleteProducers): Promise<void> {
    await this.producersRepository.delete(id);
  }
}
