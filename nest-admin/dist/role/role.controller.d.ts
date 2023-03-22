import { RoleService } from './role.service';
import { roleCreateDto } from './models/roleCreate.dto';
export declare class RoleController {
    private readonly roleService;
    constructor(roleService: RoleService);
    getRoles(): Promise<import("./models/role.entity").Role[]>;
    getRole(id: number): Promise<import("./models/role.entity").Role>;
    create(data: roleCreateDto): Promise<import("./models/role.entity").Role>;
    update(id: number, data: roleCreateDto): Promise<import("./models/role.entity").Role>;
    delete(id: number): Promise<import("typeorm").DeleteResult>;
}
