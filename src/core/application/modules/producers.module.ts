import { Module } from '@nestjs/common';
import { ProducersService } from 'src/core/domain/services/producers/producers.service';
import { ProducersController } from 'src/infrastructure/controllers/producers/producers.controller';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { ProducersRepository } from 'src/infrastructure/database/repositories/produtor.repository';
import { CountFazendasCulturaUseCase } from '../use-cases/producers/count-fazendas-cultura.use-case';
import { CountFazendasByEstadoUseCase } from '../use-cases/producers/count-fazendas-estado.use-case';
import { CountUseCase } from '../use-cases/producers/count.use-case';
import { CreateUseCase } from '../use-cases/producers/create.use-case ';
import { DeleteUseCase } from '../use-cases/producers/delete.use-case';
import { SumAreasUseCase } from '../use-cases/producers/sum-areas.use-case';
import { SumTotalHectaresUseCase } from '../use-cases/producers/sum-total-hectares.use-case';
import { UpdateUseCase } from '../use-cases/producers/update.use-case';

@Module({
  imports: [],
  controllers: [ProducersController],
  providers: [
    ProducersRepository,
    CreateUseCase,
    UpdateUseCase,
    DeleteUseCase,
    ProducersService,
    PrismaService,
    CountUseCase,
    SumTotalHectaresUseCase,
    CountFazendasByEstadoUseCase,
    CountFazendasCulturaUseCase,
    SumAreasUseCase,
  ],
})
export class ProducersModule {}
