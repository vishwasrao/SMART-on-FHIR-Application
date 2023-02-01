import { Test, TestingModule } from '@nestjs/testing';
import { FhirService } from './fhir.service';

describe('FhirService', () => {
  let service: FhirService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FhirService],
    }).compile();

    service = module.get<FhirService>(FhirService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
