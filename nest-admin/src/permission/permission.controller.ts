import { HasPermission } from './has-permission.decorator';
import { PermissionService } from './permission.service';
import { Controller, Get } from '@nestjs/common';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  @HasPermission('permissions')
  async all() {
    return this.permissionService.getall();
  }
}
