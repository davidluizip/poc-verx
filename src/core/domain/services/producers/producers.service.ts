import { Injectable } from '@nestjs/common';
import { CountFazendasCulturaUseCase } from 'src/core/application/use-cases/producers/count-fazendas-cultura.use-case';
import { CountFazendasByEstadoUseCase } from 'src/core/application/use-cases/producers/count-fazendas-estado.use-case';
import { CountUseCase } from 'src/core/application/use-cases/producers/count.use-case';
import {
  CreateUseCase,
  ICreateProducers,
} from 'src/core/application/use-cases/producers/create.use-case ';
import {
  DeleteUseCase,
  IDeleteProducers,
} from 'src/core/application/use-cases/producers/delete.use-case';
import { SumAreasUseCase } from 'src/core/application/use-cases/producers/sum-areas.use-case';
import { SumTotalHectaresUseCase } from 'src/core/application/use-cases/producers/sum-total-hectares.use-case';
import {
  IUpdateProducers,
  UpdateUseCase,
} from 'src/core/application/use-cases/producers/update.use-case';

@Injectable()
export class ProducersService {
  constructor(
    private readonly createUseCase: CreateUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly deleteUseCase: DeleteUseCase,
    private readonly countUseCase: CountUseCase,
    private readonly sumTotalHectaresUseCase: SumTotalHectaresUseCase,
    private readonly countFazendasByEstadoUseCase: CountFazendasByEstadoUseCase,
    private readonly countFazendasCulturaUseCase: CountFazendasCulturaUseCase,
    private readonly sumAreasUseCase: SumAreasUseCase,
  ) {}

  sumAreas() {
    return this.sumAreasUseCase.run();
  }

  countFazendasCultura() {
    return this.countFazendasCulturaUseCase.run();
  }

  countFazendasByEstado() {
    return this.countFazendasByEstadoUseCase.run();
  }

  sumTotalHectares() {
    return this.sumTotalHectaresUseCase.run();
  }

  count() {
    return this.countUseCase.run();
  }

  create(producers: ICreateProducers) {
    return this.createUseCase.run(producers);
  }

  update(producers: IUpdateProducers) {
    return this.updateUseCase.run(producers);
  }

  delete(producers: IDeleteProducers) {
    return this.deleteUseCase.run(producers);
  }
}
