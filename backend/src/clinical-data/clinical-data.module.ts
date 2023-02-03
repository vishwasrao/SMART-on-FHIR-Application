import { Module } from '@nestjs/common';
import { FhirService } from 'src/fhir/fhir.service';
import { ClinicalDataController } from './clinical-data.controller';
import { ClinicalDataService } from './clinical-data.service';

@Module({
  controllers: [ClinicalDataController],
  providers: [ClinicalDataService, FhirService]
})
export class ClinicalDataModule {}
