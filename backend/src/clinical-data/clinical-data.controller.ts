import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ClinicalDataService } from './clinical-data.service';

@Controller('clinical-data')
export class ClinicalDataController {
  constructor(private readonly clinicalDataService: ClinicalDataService) {}
  @Get()
  async clinicalData(@Req() request: Request) {
    const sessionId = request.cookies['sessionId'];
    return await this.clinicalDataService.getClinicaData(sessionId);
  }
}
