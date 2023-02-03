import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { RegistryService } from 'src/registry/registry.service';
import { Cache } from 'cache-manager';
import { FhirService } from 'src/fhir/fhir.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
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
    const appRegistration = await this.registryService.getRegistration(
      appName,
      iss,
    );
    const wellKnownConfig = await this.fhirService.getWellKnownConfig(iss);
    const cacheMap = {
      appRegistration: appRegistration,
      wellKnownConfig: wellKnownConfig,
      callBackParams: null,
      accessTokenRespons: null,
    };
    const sessionId = crypto.randomUUID();
    await this.cacheManager.set(sessionId, cacheMap, this.TTL);

    const url =
      wellKnownConfig.authorization_endpoint +
      '?response_type=code&client_id=' +
      appRegistration.clientId +
      '&redirect_uri=' +
      appRegistration.redirectUrl +
      '&launch=' +
      launch +
      '&scope=' +
      appRegistration.scope +
      '&state=' +
      sessionId +
      '&aud=' +
      iss;

    return url;
  }

  async callback(authorizationCode: string, state: string) {
    this.logger.log(
      'authorizationCode: ' + authorizationCode + ' State: ' + state,
    );
    const sessionMap: any = await this.cacheManager.get(state);
    this.logger.log('****sessionMap: ' + JSON.stringify(sessionMap));

    const accessTokenResponse = await this.fhirService.getAccessToken(
      sessionMap.wellKnownConfig.token_endpoint,
      authorizationCode,
      sessionMap.appRegistration.redirectUrl,
      sessionMap.appRegistration.clientId,
      sessionMap.appRegistration.clientSecret,
    );
    this.logger.log(
      'accessTokenResponseObject: ' + JSON.stringify(accessTokenResponse),
    );

    sessionMap.callBackParams = { authorizationCode, state };
    sessionMap.accessTokenRespons = accessTokenResponse;

    await this.cacheManager.set(state, sessionMap, this.TTL);

    const updatedSessionMap: any = await this.cacheManager.get(state);
    this.logger.log(
      '****updatedSessionMap: ' + JSON.stringify(updatedSessionMap),
    );

    return sessionMap.appRegistration.launchUrl;
  }
}
