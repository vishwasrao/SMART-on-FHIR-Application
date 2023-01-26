import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    getHello(): String{
        return "Hello from Auth"
    }
}
