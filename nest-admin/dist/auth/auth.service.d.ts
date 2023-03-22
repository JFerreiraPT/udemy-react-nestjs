import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    getAuthUser(request: Request): Promise<number>;
}
