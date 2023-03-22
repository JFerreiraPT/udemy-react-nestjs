import { BaseService } from 'src/common/base-service/base.service';
import { Role } from './models/role.entity';
import { Repository } from 'typeorm';
export declare class RoleService extends BaseService<Role> {
    private readonly roleRepository;
    constructor(roleRepository: Repository<Role>);
}
