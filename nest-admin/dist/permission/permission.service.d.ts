import { BaseService } from 'src/common/base-service/base.service';
import { Permission } from './models/permission.entity';
import { Repository } from 'typeorm';
export declare class PermissionService extends BaseService<Permission> {
    private readonly permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
}
