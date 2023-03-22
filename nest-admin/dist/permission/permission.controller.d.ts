import { PermissionService } from './permission.service';
export declare class PermissionController {
    private readonly permissionService;
    constructor(permissionService: PermissionService);
    all(): Promise<import("./models/permission.entity").Permission[]>;
}
