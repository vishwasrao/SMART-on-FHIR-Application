import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { RegistryService } from 'src/registry/registry.service';
import { Cache } from 'cache-manager';
import { FhirService } from 'src/fhir/fhir.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private appName: string;
  private TTL = 60000;

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
    const appRegistration = await this.registryService.getRegistration(
      appName,
      iss,
    );

    // Save this registration into cache
    const appRegKeyName = appName + '_appRegistration';
    await this.cacheManager.set(appRegKeyName, appRegistration, this.TTL);

    const appReg: any = await this.cacheManager.get(appRegKeyName);

    const wellKnownConfig = await this.fhirService.getWellKnownConfig(iss);

    const wellKnownConfigKeyName = appName + '_wellKnownConfig';
    await this.cacheManager.set(
      wellKnownConfigKeyName,
      wellKnownConfig,
      this.TTL,
    );

    const config: any = await this.cacheManager.get(wellKnownConfigKeyName);

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
    const wellKnownConfigKeyName1 = this.appName + '_wellKnownConfig';
    this.logger.log('wellKnownConfigKeyName1: ' + wellKnownConfigKeyName1);
    const config1: any = await this.cacheManager.get(wellKnownConfigKeyName1);
    this.logger.log('****wellKnownConfig1: ' + JSON.stringify(config1));
    const appRegKeyName1 = this.appName + '_appRegistration';
    const appRegistration1: any = await this.cacheManager.get(appRegKeyName1);

    this.logger.log('appRegistration: ' + JSON.stringify(appRegistration1));

    const accessTokenResponseObject = await this.fhirService.getAccessToken(
      config1.token_endpoint,
      authorizationCode,
      appRegistration1.redirectUrl,
      appRegistration1.clientId,
      appRegistration1.clientSecret,
    );
    this.logger.log(
      'accessTokenResponseObject: ' + JSON.stringify(accessTokenResponseObject),
    );
    return appRegistration1.launchUrl;
  }
}
