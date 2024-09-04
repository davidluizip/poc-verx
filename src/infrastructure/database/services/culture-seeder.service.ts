import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CultureSeederService {
  private readonly logger = new Logger(CultureSeederService.name);

  private readonly defaultCultures = [
    'Soja',
    'Milho',
    'Algodão',
    'Café',
    'Cana de Açúcar',
  ];

  constructor(private readonly prisma: PrismaService) {}

  async seedCultures() {
    try {
      for (const culture of this.defaultCultures) {
        const existingCulture = await this.prisma.culturas.count({
          where: { nome: culture },
        });

        if (!existingCulture) {
          await this.prisma.culturas.create({
            data: { nome: culture },
          });
          this.logger.log(`Culture ${culture} added.`);
        } else {
          this.logger.log(`Culture ${culture} already exists.`);
        }
      }
    } catch (error) {
      this.logger.error('Error seeding cultures', error.stack);
    }
  }
}
