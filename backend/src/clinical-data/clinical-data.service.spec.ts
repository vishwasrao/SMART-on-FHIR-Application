import { Test, TestingModule } from '@nestjs/testing';
import { ClinicalDataService } from './clinical-data.service';

describe('ClinicalDataService', () => {
  let service: ClinicalDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClinicalDataService],
    }).compile();

    service = module.get<ClinicalDataService>(ClinicalDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
