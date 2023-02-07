import { Injectable, Logger } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import axios from 'axios';
import qs = require('qs');

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

  async getAccessToken(
    tokenEndpoint: string,
    authorizationCode: string,
    redirectUrl: string,
    clientId: string,
    clientSecret: string,
  ) {
    try {
      const data = qs.stringify({
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirectUrl,
      });
      const config = {
        method: 'post',
        url: tokenEndpoint,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: clientId,
          password: clientSecret,
        },
        data: data,
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      const message =
        'Error while getting access token from token endpoint: ' +
        tokenEndpoint +
        ' Error: ' +
        error;
      this.logger.error(message);
      throw new InternalServerErrorException(message);
    }
  }

  async getClinicaData(
    fhirServerUrl: string,
    accessToken: string,
    patientId: string,
    clinicalResources: string[],
  ) {
    this.logger.log('accessToken: ' + accessToken);
    this.logger.log('clinicalResources: ' + JSON.stringify(clinicalResources));
    const fhirQueries = this.createFhirQueries(
      fhirServerUrl,
      accessToken,
      patientId,
      clinicalResources,
    );
    return JSON.stringify(fhirQueries);
  }

  createFhirQueries(
    fhirServerUrl: string,
    accessToken: string,
    patientId: string,
    clinicalResources: string[],
  ) {
    const fhirQueries = [];
    for (const clinicalResource of clinicalResources) {
      const query =
        fhirServerUrl + '/' + clinicalResource + '?patient=' + patientId;
      fhirQueries.push(query);
    }
    return fhirQueries;
  }
}
