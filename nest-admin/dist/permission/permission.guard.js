"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const role_service_1 = require("./../role/role.service");
const user_service_1 = require("./../user/user.service");
const auth_service_1 = require("./../auth/auth.service");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
let PermissionGuard = class PermissionGuard {
    constructor(reflector, authService, userService, roleService) {
        this.reflector = reflector;
        this.authService = authService;
        this.userService = userService;
        this.roleService = roleService;
    }
    async canActivate(context) {
        const access = this.reflector.get('access', context.getHandler());
        if (!access) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authUserID = await this.authService.getAuthUser(request);
        const user = await this.userService.findOne({ id: authUserID }, ['role']);
        const permissions = (await this.roleService.findOne({ id: user.role.id }, ['permissions'])).permissions;
        const access_needed = request.method === 'GET' ? `view_${access}` : `edit_${access}`;
        return permissions.some((p) => p.name === access_needed);
    }
};
PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        auth_service_1.AuthService,
        user_service_1.UserService,
        role_service_1.RoleService])
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
//# sourceMappingURL=permission.guard.js.map