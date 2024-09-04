import { Test, TestingModule } from '@nestjs/testing';
import { CulturesService } from 'src/core/domain/services/cultures/cultures.service';
import { CulturesController } from './cultures.controller';

describe('CulturesController', () => {
  let controller: CulturesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CulturesController],
      providers: [CulturesService],
    }).compile();

    controller = module.get<CulturesController>(CulturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
