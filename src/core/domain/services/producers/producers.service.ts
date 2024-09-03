import { Injectable } from '@nestjs/common';
import {
  CreateUseCase,
  ICreateProducers,
} from 'src/core/application/use-cases/producers/create.use-case ';

@Injectable()
export class ProducersService {
  constructor(private readonly createUseCase: CreateUseCase) {}
  create(producers: ICreateProducers) {
    return this.createUseCase.run(producers);
  }
}
