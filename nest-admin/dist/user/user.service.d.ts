import { Repository } from 'typeorm';
import { User } from './models/user.entity';
import { BaseService } from 'src/common/base-service/base.service';
export declare class UserService extends BaseService<User> {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    login(email: string, password: string): Promise<User>;
}
