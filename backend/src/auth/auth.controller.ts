import { Controller, Get, Param, Query, Redirect, Res } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthService } from './auth.service';
import { Response } from 'express';

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
  async callback(
    @Query('code') authorizationCode: string,
    @Query('state') state: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const launchUrl = await this.authService.callback(authorizationCode, state);
    // return { url: launchUrl };
    res.cookie('sessionId', state, {
      maxAge: 3600000,
      httpOnly: true,
      sameSite: false,
      secure: true,
    });
    res.status(HttpStatus.FOUND);
    res.redirect(launchUrl);
  }
}
