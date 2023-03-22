import { RoleService } from './role.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
} from '@nestjs/common';
import { roleCreateDto } from './models/roleCreate.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRoles() {
    return this.roleService.getall();
  }

  @Get(':id')
  async getRole(@Param('id') id: number) {
    return this.roleService.findOne({ id }, ['permissions']);
  }

  @Post()
  async create(@Body() data: roleCreateDto) {
    const { name, permissions } = data;

    return this.roleService.create({
      name,
      permissions: permissions.map((id) => ({ id })),
    });
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: roleCreateDto) {
    const { name, permissions } = data;
    await this.roleService.update(id, {
      name,
    });

    //to update relationship
    return this.roleService.create({
      ...(await this.roleService.findOne({ id })),
      permissions: permissions.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.roleService.delete(id);
  }
}
