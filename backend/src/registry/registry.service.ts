import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as jsonata from 'jsonata';

const REGISTRATIONS = JSON.parse(
  fs.readFileSync('src/registry/registrations.json', 'utf8'),
);

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
      "[apps[appName='" + appName + "'][issuer='" + issuer + "']]";
    this.logger.log('Expression: ' + expression);
    const appRegistration = await jsonata(expression).evaluate(REGISTRATIONS);
    if (appRegistration.length === 0) {
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
