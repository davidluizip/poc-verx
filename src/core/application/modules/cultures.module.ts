import { Module } from '@nestjs/common';
import { CulturesService } from 'src/core/domain/services/cultures/cultures.service';
import { CulturesController } from 'src/infrastructure/controllers/cultures/cultures.controller';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { CulturesRepository } from 'src/infrastructure/database/repositories/cultures.repository';
import { FindAllUseCase } from '../use-cases/cultures/find-all.use-case';

@Module({
  imports: [],
  controllers: [CulturesController],
  providers: [
    PrismaService,
    CulturesService,
    CulturesRepository,
    FindAllUseCase,
  ],
})
export class CulturesModule {}
