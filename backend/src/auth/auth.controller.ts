import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Get('/init/:appName')
    async init(
        @Param('appName') appName: String,
        @Query('iss') iss: String,
        @Query('launch') launch:String
     ): Promise<String>{
        return await this.authService.init(appName, iss, launch)
    }
}
