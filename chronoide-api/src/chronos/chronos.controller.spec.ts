import { Test, TestingModule } from '@nestjs/testing';
import { ChronosController } from './chronos.controller';
import { ChronosService } from './chronos.service';

describe('ChronosController', () => {
  let controller: ChronosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChronosController],
      providers: [ChronosService],
    }).compile();

    controller = module.get<ChronosController>(ChronosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
