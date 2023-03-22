import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { RegisterDto } from './models/Register.dto';
import { User } from 'src/user/models/user.entity';
import { Response, Request } from 'express';
export declare class AuthController {
    private readonly userService;
    private readonly authService;
    private readonly jwtService;
    constructor(userService: UserService, authService: AuthService, jwtService: JwtService);
    register(body: RegisterDto): Promise<User>;
    login(email: string, password: string, response: Response): Promise<User>;
    authUser(request: Request): Promise<User>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
