import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import jsonata from 'jsonata';
import REGISTRATIONS from './registrations.json';

@Injectable()
export class RegistryService {
  private readonly logger = new Logger(RegistryService.name);

  async getRegistration(appName: string, issuer: string): Promise<any> {
    this.logger.log(
      'Getting application registration for app: ' +
        appName +
        ' & issuer: ' +
        issuer,
    );
    const expression =
      "apps[appName='" + appName + "'][issuer='" + issuer + "']";
    const appRegistration = await jsonata(expression).evaluate(REGISTRATIONS);
    if (!appRegistration) {
      const message =
        'No regisration found found for appName: ' +
        appName +
        ' & issuer: ' +
        issuer;
      this.logger.error(message);
      throw new BadRequestException(message);
    }
    return appRegistration;
  }
}
