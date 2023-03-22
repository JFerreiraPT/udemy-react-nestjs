import { RoleService } from './../role/role.service';
import { UserService } from './../user/user.service';
import { AuthService } from './../auth/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private userService: UserService,
    private roleService: RoleService,
  ) {}
  async canActivate(context: ExecutionContext) {
    //get the metadata from decorator we created
    const access = this.reflector.get('access', context.getHandler());
    if (!access) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const authUserID = await this.authService.getAuthUser(request);
    const user = await this.userService.findOne({ id: authUserID }, ['role']);
    const permissions = (
      await this.roleService.findOne({ id: user.role.id }, ['permissions'])
    ).permissions;

    const access_needed =
      request.method === 'GET' ? `view_${access}` : `edit_${access}`;

    return permissions.some((p) => p.name === access_needed);
  }
}
