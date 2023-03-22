import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserCreateDto, UserUpdateDto } from './models/UserCreate.dto';
import { Request } from 'express';
export declare class UserController {
    private userService;
    private authService;
    constructor(userService: UserService, authService: AuthService);
    all(page: number): Promise<import("../common/paginated-result.interface").PaginatedResult<User>>;
    create(body: UserCreateDto): Promise<User>;
    updateInfo(request: Request, body: UserUpdateDto): Promise<User>;
    updatePassword(request: Request, password: string, password_confirm: string): Promise<{
        message: string;
    }>;
    getUser(id: string): Promise<User>;
    update(id: string, body: UserUpdateDto): Promise<User>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
