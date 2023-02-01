import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { RegistryService } from 'src/registry/registry.service';
import { Cache } from 'cache-manager';
import { FhirService } from 'src/fhir/fhir.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private appName: string;
  private issuer: string;

  constructor(
    private readonly registryService: RegistryService,
    private readonly fhirService: FhirService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async init(appName: string, iss: string, launch: string): Promise<any> {
    this.logger.log(
      'appName:- ' + appName + ' iss:- ' + iss + ' launch:- ' + launch,
    );
    this.appName = appName;
    this.issuer = iss;
    const appRegistration = await this.registryService.getRegistration(
      appName,
      iss,
    );

    // Save this registration into cache
    const appRegKeyName = appName + '_appRegistration';
    await this.cacheManager.set(appRegKeyName, appRegistration);

    const appReg: any = await this.cacheManager.get(appRegKeyName);
    this.logger.log('appRegistration: ' + JSON.stringify(appReg));

    const wellKnownConfig = await this.fhirService.getWellKnownConfig(iss);

    const wellKnownConfigKeyName = appName + '_wellKnownConfig';
    await this.cacheManager.set(wellKnownConfigKeyName, wellKnownConfig);

    const config: any = await this.cacheManager.get(wellKnownConfigKeyName);
    this.logger.log('wellKnownConfig: ' + JSON.stringify(config));

    const url =
      config.authorization_endpoint +
      '?response_type=code&client_id=' +
      appReg.clientId +
      '&redirect_uri=' +
      appReg.redirectUrl +
      '&launch=' +
      launch +
      '&scope=' +
      appReg.scope +
      '&state=abcd1234' +
      '&aud=' +
      iss;

    return url;
  }

  async callback(authorizationCode: string, state: string) {
    this.logger.log(
      'authorizationCode: ' + authorizationCode + ' State: ' + state,
    );
    const wellKnownConfigKeyName = this.appName + '_wellKnownConfig';
    const config: any = await this.cacheManager.get(wellKnownConfigKeyName);
    const appRegKeyName = this.appName + '_appRegistration';
    const appRegistration: any = await this.cacheManager.get(appRegKeyName);

    const accessTokenResponseObject = await this.fhirService.getAccessToken(
      config.token_endpoint,
      authorizationCode,
      appRegistration.redirectUrl,
      appRegistration.clientId,
      appRegistration.clientSecret,
    );
    this.logger.log(
      'accessTokenResponseObject: ' + JSON.stringify(accessTokenResponseObject),
    );
    return 'abcd';
  }
}
