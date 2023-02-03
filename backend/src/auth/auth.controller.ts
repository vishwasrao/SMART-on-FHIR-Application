import { Controller, Get, Param, Query, Redirect } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/init/:appName')
  @Redirect('https://fhirServer.com/authorization_endpoint', 302)
  async init(
    @Param('appName') appName: string,
    @Query('iss') iss: string,
    @Query('launch') launch: string,
  ): Promise<any> {
    const authCodeUrl = await this.authService.init(appName, iss, launch);
    return { url: authCodeUrl };
  }

  @Get('/callback')
  @Redirect('http://localhost:3000', 302)
  async callback(
    @Query('code') authorizationCode: string,
    @Query('state') state: string,
  ) {
    return await this.authService.callback(authorizationCode, state);
  }
}
