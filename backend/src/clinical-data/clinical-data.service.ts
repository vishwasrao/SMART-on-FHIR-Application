import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { FhirService } from 'src/fhir/fhir.service';
import { Cache } from 'cache-manager';

@Injectable()
export class ClinicalDataService {

    constructor(
        private readonly fhirService: FhirService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
      ) {}

      async getClinicaData(){
        // Get clinical data resources from cache        
        return this.fhirService.getClinicaData()
      }
}
