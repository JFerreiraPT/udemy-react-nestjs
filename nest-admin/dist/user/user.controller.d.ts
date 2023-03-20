import { UserService } from './user.service';
import { User } from './models/user.entity';
import { UserCreateDto, UserUpdateDto } from './models/UserCreate.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    all(): Promise<User[]>;
    create(body: UserCreateDto): Promise<User>;
    getUser(id: string): Promise<User>;
    update(id: string, body: UserUpdateDto): Promise<User>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
}
