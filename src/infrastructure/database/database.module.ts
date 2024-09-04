import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CultureSeederService } from './services/culture-seeder.service';

@Module({
  providers: [PrismaService, CultureSeederService],
  exports: [PrismaService, CultureSeederService],
})
export class DatabaseModule {}
