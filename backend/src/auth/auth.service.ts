import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

    init(appName: String, iss: String, launch: String): String{
        console.log('appName:- ' + appName + ' iss:- ' + iss + ' launch:- ' + launch)
        return "Hello from Auth init"
    }
}
