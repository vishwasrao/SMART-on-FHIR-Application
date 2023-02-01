import { Injectable, Logger } from '@nestjs/common';
import { RegistryService } from 'src/registry/registry.service';

@Injectable()
export class AuthService {

    private readonly logger = new Logger(AuthService.name)
    constructor(private readonly registryService: RegistryService) {}

    async init(appName: String, iss: String, launch: String): Promise<any>{
        console.log('appName:- ' + appName + ' iss:- ' + iss + ' launch:- ' + launch)
        const appRegistration = await this.registryService.getRegistration(appName, iss)
        // Save this registration into cache
        return appRegistration
    }
}
