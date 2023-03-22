import { RoleService } from './../role/role.service';
import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
export declare class PermissionGuard implements CanActivate {
    private reflector;
    private authService;
    private userService;
    private roleService;
    constructor(reflector: Reflector, authService: AuthService, userService: UserService, roleService: RoleService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
