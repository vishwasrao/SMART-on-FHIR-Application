import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalDataController } from './clinical-data.controller';

describe('ClinicalDataController', () => {
  let controller: ClinicalDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClinicalDataController],
    }).compile();

    controller = module.get<ClinicalDataController>(ClinicalDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
