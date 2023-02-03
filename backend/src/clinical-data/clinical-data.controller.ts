import { Controller, Get } from '@nestjs/common';
import { get } from 'http';

@Controller('clinical-data')
export class ClinicalDataController {

    @Get()
    async clinicalData(){
        //Get sessionId from cookie and send it
        
    }
}
