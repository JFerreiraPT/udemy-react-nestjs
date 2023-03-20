import { UserUpdateDto } from './models/UserCreate.dto';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    getall(): Promise<User[]>;
    create(data: any): Promise<User>;
    update(id: string, data: UserUpdateDto): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
    findOne(condition: any): Promise<User>;
    login(email: string, password: string): Promise<User>;
}
