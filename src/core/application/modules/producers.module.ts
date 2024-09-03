import { Module } from '@nestjs/common';
import { ProducersService } from 'src/core/domain/services/producers/producers.service';
import { ProducersController } from 'src/infrastructure/controllers/producers/producers.controller';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { ProducersRepository } from 'src/infrastructure/database/repositories/produtor.repository';
import { CreateUseCase } from '../use-cases/producers/create.use-case ';

@Module({
  imports: [],
  controllers: [ProducersController],
  providers: [
    ProducersRepository,
    CreateUseCase,
    ProducersService,
    PrismaService,
  ],
})
export class ProducersModule {}
