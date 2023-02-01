import { Injectable, Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import axios from 'axios';

@Injectable()
export class FhirService {
  private readonly logger = new Logger(FhirService.name);

  async getWellKnownConfig(issuer: string): Promise<any> {
    try {
      const url = issuer + '/.well-known/smart-configuration';
      this.logger.log('Url: ' + url);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      const message =
        'Error while getting .well-known/smart-configuration from Issuer(Fhir Server): ' +
        issuer +
        ' Error: ' +
        error;
      this.logger.error(message);
      throw new InternalServerErrorException(message);
    }
  }
}
