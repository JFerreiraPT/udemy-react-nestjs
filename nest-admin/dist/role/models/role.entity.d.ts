import { Permission } from './../../permission/models/permission.entity';
export declare class Role {
    id: number;
    name: string;
    permissions: Permission[];
}
